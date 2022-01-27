import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuotesController } from "./quotes.controller";
import { QuotesService } from "./quotes.service";
import { QuotesSchema } from "./schema/quotes.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
          {
            name: 'Quotes',
            schema: QuotesSchema
          }
        ])
      ],
     providers: [QuotesService],
     controllers: [QuotesController]

})
export class QuotesModule {}