import { Document } from 'mongoose';

export interface IServices extends Document{
    reparacion_id:string;
    nombre:string;
    precio:number;
}