import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ICashcut } from "./interfaces/cashcut-interface";

@Injectable()
export class CashcutsService{
    constructor(
        @InjectModel('Cashcut') private readonly cashcutModel: Model<ICashcut>
    ) {}
    async getAll(): Promise<Array<ICashcut>> {
        return this.cashcutModel.find().lean();
    }
}