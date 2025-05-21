import { Module } from '@nestjs/common';
import { DbConfigService } from './db-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from './entities/product.entity';
import { ProductSeederService } from '../seeders/product-seeder-service';
import { CartSeederService } from '../seeders/cart-seeder-service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
    }),
    TypeOrmModule.forFeature([Cart, Product]),
  ],

  providers: [ProductSeederService,CartSeederService],
  exports: [TypeOrmModule,ProductSeederService,CartSeederService],
})
export class DbModule {}
