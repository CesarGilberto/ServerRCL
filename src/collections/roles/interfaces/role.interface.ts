import { Document } from 'mongoose';

export interface IRole extends Document {
    _id: string;
    rol_id:string;
    descripcion:string;
}