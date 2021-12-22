import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
     // providers: [NotesService],
      //controllers: [NotesController]

})
export class ProductsModule {}
