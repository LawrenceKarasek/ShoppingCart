import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../database/entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
