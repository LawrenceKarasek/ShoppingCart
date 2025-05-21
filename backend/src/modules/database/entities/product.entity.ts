import { Entity, PrimaryGeneratedColumn, Column, OneToMany,CreateDateColumn, } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  name: string;

  @Column({ length: 200})
  description: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 }) 
  price: number;
  
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];
}
