import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';


@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  cartId:number;

  @Column() 
  productId:number;

  @Column() 
  quantity: number;

  @Column() 
  purchased:boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Cart, (cart) => cart.savedCartItems)
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;
}

