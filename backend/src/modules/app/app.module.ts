import { Module} from '@nestjs/common';
import { DbModule } from '../database/db.module';
import { CartModule } from '../cart/cart.module';
import { ProductModule } from '../product/product.module';
import { ConfigModule} from '@nestjs/config';

@Module({
  imports: [DbModule,     
    ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }),

  CartModule,
  ProductModule],
})

export class AppModule {}

