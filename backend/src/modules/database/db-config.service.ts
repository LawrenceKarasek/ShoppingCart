import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; 
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { URL } from './entities/url.entity';
import { ShortName } from './entities/short-name.entity';
import { Tracker } from './entities/tracker.entity';

@Injectable()
export class DbConfigService {
  constructor(private configService: ConfigService) {} 

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {

    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'), 
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [User, URL, ShortName, Tracker],
      synchronize: true,
    };
  }
}