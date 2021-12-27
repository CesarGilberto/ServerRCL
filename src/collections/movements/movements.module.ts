import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MovementsController } from "./movements.controller";
import { MovementsService } from "./movements.service";
import { MovementsSchema } from "./schema/movements.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
          {
            name: 'Movement',
            schema: MovementsSchema
          }
        ])
      ],
     providers: [MovementsService],
     controllers: [MovementsController]

})
export class MovementsModule{}