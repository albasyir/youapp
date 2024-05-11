import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "src/user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Config } from "src/app.config";

@Module({
  imports: [
    /**
     * JWT Module
     */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService<Config>) {
        const jwtConfig = config.get<Config['jwt']>("jwt");

        return {
          secret: jwtConfig.secret
        }
      }
    }),
    
    UserModule,
    PassportModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule { }