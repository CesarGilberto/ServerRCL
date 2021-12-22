import { Document } from 'mongoose';

export interface IProducts extends Document{
    cantidad: number;
    categoria:string;
    color:string;
    marca:string;
    nombre:string;
    precio:number;
    producto_id:string;
    tam:string
}