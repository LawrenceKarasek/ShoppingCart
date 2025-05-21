import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../database/entities/product.entity';

@Injectable()
export class ProductSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  public async seedProducts() {

    //TODO: in production environment, need separate product management. if (process.env.NODE_ENV === 'production') return;
    const count = await this.productRepository.count();
    
    if(count === 0) {
      const products = this.generateSampleProducts();

      await this.productRepository.upsert(products, ['name']);
      console.log('Seeded products');

    }
  }

    private generateSampleProducts(): Product[] {
      function getRandomPrice(min: number, max: number): number {
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
      }

      const groceryItems = [
        { name: 'Organic Milk', description: 'Pasteurized organic whole milk' },
        { name: 'Whole Wheat Bread', description: 'Freshly baked artisan loaf' },
        { name: 'Free-Range Eggs', description: 'Large grade AA eggs (12 count)' },
        { name: 'Bananas', description: 'Fresh ripe bananas, sold by the bunch' },
        { name: 'Boneless Chicken Breast', description: 'Skinless, boneless chicken breast fillets' },
        { name: 'Baby Spinach', description: 'Washed and ready-to-eat baby spinach leaves' },
        { name: 'Cheddar Cheese', description: 'Sharp aged cheddar cheese block' },
        { name: 'Greek Yogurt', description: 'Plain, non-fat Greek yogurt (32 oz)' },
        { name: 'Russet Potatoes', description: 'Hearty russet potatoes, perfect for baking' },
        { name: 'Honeycrisp Apples', description: 'Crisp, sweet Honeycrisp apples' },
        { name: 'Almond Butter', description: 'Creamy roasted almond butter, unsweetened' },
        { name: 'Brown Rice', description: 'Whole grain brown rice (2 lb bag)' },
        { name: 'Tomato Sauce', description: 'Rich Italian-style tomato sauce (24 oz jar)' }
      ].map(item => ({
        ...item,
        price: getRandomPrice(3, 10)
      }));

        return groceryItems.map((item, index) => 
            this.productRepository.create({
            id: index + 1,
            ...item,
            created_at: new Date()
            })
        );
    }
}
