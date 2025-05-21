import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @CreateDateColumn()
  created_at: Date;

  // Add inverse relationship
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  savedCartItems: CartItem[];
}
