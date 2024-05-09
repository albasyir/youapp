import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Config, config } from './app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    // ==== DEPEDENCIES MODULE START =====

    /**
     * Config Module
     */
    ConfigModule.forRoot({
      // validationSchema: better to add this
      isGlobal: true,
      load: [config]
    }),
    
    /**
     * JWT Module
     */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory(config: ConfigService<Config>) {
        const jwtConfig = config.get<Config['jwt']>("jwt");

        return {
          secret: jwtConfig.secret
        }
      }
    }),

    /**
     * Mongoose Module
     */
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService<Config>) {
        const mongoConfig = config.get<Config['mongo']>("mongo");

        return {
          uri: mongoConfig.url
        }
      },
    }),

    // ==== APP MODULE START =====

    AuthModule,
    UserModule
  ],
})
export class AppModule {
}
