import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Config, config } from './app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';

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
    UserModule,
    ProfileModule
  ],
})
export class AppModule {
}
