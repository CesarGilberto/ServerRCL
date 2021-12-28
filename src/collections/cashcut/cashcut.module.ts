import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CashcutController } from "./cashcut.controller";
import { CashcutsService } from "./cashcut.service";
import { CashcutSchema } from "./schema/cashcut-schema";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:'Cashcut',
                schema:CashcutSchema
            }
        ])
    ],
    providers:[CashcutsService],
    controllers:[CashcutController]
})
export class CashcutModule{}