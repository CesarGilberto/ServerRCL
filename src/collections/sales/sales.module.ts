import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SalesController } from "./sales.controller";
import { SalesService } from "./sales.service";
import { SalesSchema } from "./schema/sales.schema";
@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:'Sale',
                schema:SalesSchema
            }
        ])
    ],
    providers:[SalesService],
    controllers:[SalesController]
})
export class SalesModule{}