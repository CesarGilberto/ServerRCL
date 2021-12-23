import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsSchema } from './schema/products-schema';

@Module({
    imports: [
        MongooseModule.forFeature([
          {
            name: 'Product',
            schema: ProductsSchema
          }
        ])
      ],
     providers: [ProductsService],
     controllers: [ProductsController]

})
export class ProductsModule {}
