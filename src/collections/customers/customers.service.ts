import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomersDto } from './dto/customers.dto';
import { ICustomers } from './interfaces/customers-interface';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel('Customer') private readonly customerModel: Model<ICustomers>
    ) {}
    async create(customerDto: CustomersDto): Promise<ICustomers> {
        const created = new this.customerModel(customerDto);
        return created.save();
    }
    async getAll(): Promise<Array<ICustomers>> {
        return this.customerModel.find();
    }
    async getById(_id):Promise<ICustomers>{
        return this.customerModel.findOne({cliente_id:_id});
    }
    async getByUser(usuario_id):Promise<ICustomers>{
        return this.customerModel.findOne({usuario_id});
    }
}