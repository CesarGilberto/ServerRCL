import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IServices } from './interfaces/services.interface';

@Injectable()
export class ServicesService {
    constructor(
        @InjectModel('Service') private readonly serviceModel: Model<IServices>
    ) {}

    async getAll(): Promise<Array<IServices>> {
        return this.serviceModel.find();
    }
    async getById(_id):Promise<IServices>{
        return this.serviceModel.findOne({serviceid:_id});
    }
}
