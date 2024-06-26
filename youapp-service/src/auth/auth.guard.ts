import { CanActivate, ExecutionContext, HttpException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_PATH } from "./decorators/is-public.decorator";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";

export type UserDataOnToken = { sub: string };

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);

  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private authService: AuthService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PATH, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request: Request = this.getRequestFromContextOrFail(context);
    const token: string = this.extractTokenFromHeaderOrFail(request);

    request["user"] = await this.authService.verifyToken(token).catch((err: HttpException) => {
      this.logger.warn("why this user sending invalid jwt?", { token });
      throw err;
    });

    if (!request["user"].sub) {
      this.logger.error("JWT is not valid content", request["user"])
      throw new UnauthorizedException("JWT is invalid content");
    }

    this.logger.log("request from authenticated user", request["user"])

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

  private getRequestFromContext(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  private getRequestFromContextOrFail(context: ExecutionContext): Request {
    const request = this.getRequestFromContext(context);

    if (!request) {
      throw new InternalServerErrorException("is that command line?, need to be develop for that way")
    }

    return request;
  }

  private extractTokenFromHeaderOrFail(request: Request): string {
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn("endpoint got hit even there's no token", {
        url: request.url
      });
      throw new UnauthorizedException("token can't be readed");
    }

    return token;
  }
}