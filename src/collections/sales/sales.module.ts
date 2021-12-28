import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SalesController } from "./sales.controller";
import { SalesService } from "./sales.service";
import { SaleSchema } from "./schema/sales.schema";
@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:'Sale',
                schema:SaleSchema
            }
        ])
    ],
    providers:[SalesService],
    controllers:[SalesController]
})
export class SalesModule{}