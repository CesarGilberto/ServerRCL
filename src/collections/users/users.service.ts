import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>
    ) {}

    async create(userDto: UserDto): Promise<IUser> {
        const created = new this.userModel(userDto);
        return created.save();
    }

    async getByEmail(usuario: string): Promise<IUser> {
        return this.userModel.findOne({ usuario });
    }
}
