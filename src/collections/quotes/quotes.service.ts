import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuotesDto } from "./dto/quotes.dto";
import { IQuotes } from "./interfaces/quotes.interface";

@Injectable()
export class QuotesService {
    constructor(
        @InjectModel('Quotes') private readonly quotesModel: Model<IQuotes>
    ) {}
    async create(quotesDto: QuotesDto): Promise<IQuotes> {
        const created = new this.quotesModel(quotesDto);
        return created.save();
    }
    async getAll(): Promise<Array<IQuotes>> {
        return this.quotesModel.find();
    }
}
