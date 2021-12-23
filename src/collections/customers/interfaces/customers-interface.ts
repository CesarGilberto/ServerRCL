import { Document } from 'mongoose';

export interface ICustomers extends Document{
    nombre:string;
    telefono1:string;
    telefono2:string;
}
