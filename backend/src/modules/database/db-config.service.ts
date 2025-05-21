import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; 
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from './entities/product.entity';
import { CartItem } from './entities/cart-item.entity';

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
      entities: [Cart, Product,CartItem],
      synchronize: true,//Do not use this in production to prevent unintended scherma changes. make this configurable by environment
    };
  }
}