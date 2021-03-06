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
    async getAll(): Promise<Array<IUser>> {
        return this.userModel.find();
    }
    async getByEmail(usuario: string): Promise<IUser> {
        return this.userModel.findOne({$or:[
            {usuario},{correo:usuario}
        ]});
    }
    async getByRol(_id):Promise<Array<IUser>>{
        return this.userModel.find({rol_id:_id}).select("-contrasena");
    }
    async getById(usuario_id: string): Promise<IUser> {
        return this.userModel.findOne({ usuario_id }).lean();
    }
    async setChanges(usuario_id: string, usuario): Promise<IUser> {
        return this.userModel.findOneAndUpdate({usuario_id},usuario)
    }
}   
