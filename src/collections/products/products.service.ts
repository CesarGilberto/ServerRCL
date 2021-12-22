import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProducts } from './interfaces/products-interface';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<IProducts>
    ) {}

    async getAll(): Promise<Array<IProducts>> {
        return this.productModel.find();
    }
    async getById(_id):Promise<IProducts>{
        return this.productModel.findOne({producto_id:_id});
    }
}
