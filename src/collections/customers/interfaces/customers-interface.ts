import { Document } from 'mongoose';

export interface ICustomers extends Document{
    cliente_id:string;
    nombre:string;
    telefono1:string;
    telefono2:string;
}
