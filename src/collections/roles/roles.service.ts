import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDto } from './dto/home.dto';
import { IRole } from './interfaces/role.interface';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel('Role') private readonly roleModel: Model<IRole>
    ) {}

    async getAll(): Promise<Array<IRole>> {
        return this.roleModel.find();
    }
    async getById(_id):Promise<IRole>{
        return this.roleModel.findOne({rol_id:_id});
    }
    async getByDescription(param:string):Promise<IRole>{
        return this.roleModel.findOne({descripcion:param});
    }
    async create(role: RoleDto): Promise<IRole> {
        const roleToSave = new this.roleModel(role);
        return roleToSave.save();
    }

}
