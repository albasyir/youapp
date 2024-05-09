import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_PATH } from "./decorators/is-public.decorator";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/user.entity";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PATH, [
      context.getHandler(),
      context.getClass(),
    ]);

    // if url is public, we dont need validate JWT
    if (isPublic) return true;

    const request: Request = this.getRequestFromContextOrFail(context);
    const token: string = this.extractTokenFromHeaderOrFail(request);

    request["user"] = await this.jwtService.verifyAsync<User>(token).catch((err: Error) => {
      throw new UnauthorizedException("JWT is't valid");
    });

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
      throw new UnauthorizedException("token can't be readed");
    }

    return token;
  }
}