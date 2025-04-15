import { MiddlewareConsumer, Module, NestModule  } from '@nestjs/common';
import { DbModule } from '../database/db.module';
import { UserModule } from '../user/user.module';
import { UrlModule } from '../url/url.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DbModule,     
    ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }),
  JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '12h' },
    }),
    inject: [ConfigService],
  }),
  UserModule,
  UrlModule],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('users/register', 'users/login', 'users/logout', 'users/check-auth','urls/:shortUrl',
)
      .forRoutes('*');
  }
}
