import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServicesSchema } from "./schema/services.schema";
import { ServicesController } from "./services.controller";
import { ServicesService } from "./services.service";

@Module({
    imports: [
        MongooseModule.forFeature([
          {
            name: 'Service',
            schema: ServicesSchema
          }
        ])
      ],
     providers: [ServicesService],
     controllers: [ServicesController]

})
export class ServicesModule {}