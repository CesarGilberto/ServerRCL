import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersSchema } from './schema/customers-schema';

@Module({
    imports: [
        MongooseModule.forFeature([
          {
            name: 'Customer',
            schema: CustomersSchema
          }
        ])
      ],
     providers: [CustomersService],
     controllers: [CustomersController]

})
export class CustomersModule {}
