import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISale } from './interfaces/sales.interface';

@Injectable()
export class SalesService {
    constructor(
        @InjectModel('Sale') private readonly saleModel: Model<ISale>
    ) {}

    async getAll(): Promise<Array<ISale>> {
        return this.saleModel.find();
    }
    async getById(_id):Promise<ISale>{
        return this.saleModel.findOne({venta_id:_id});
    }
}