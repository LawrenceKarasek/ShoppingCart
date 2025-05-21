import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../database/entities/cart.entity';
import { Product } from '../database/entities/product.entity';
import { CartItem } from '../database/entities/cart-item.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product,CartItem])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
