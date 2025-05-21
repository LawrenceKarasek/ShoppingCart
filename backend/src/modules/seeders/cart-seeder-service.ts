// src/database/services/product-seeder.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../database/entities/cart.entity';

@Injectable()
export class CartSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>
  ) {}

  async onModuleInit() {
    await this.seedCart();
  }

  private async seedCart() {

    //TODO: in production environment, need separate user creation. if (process.env.NODE_ENV === 'production') return;
    const count = await this.cartRepository.count();
    
    if (count === 0) {
        const cart = this.cartRepository.create({username:'TestUser'});
        this.cartRepository.save(cart);
        console.log('Seeded cart user');
    }
  }
}
