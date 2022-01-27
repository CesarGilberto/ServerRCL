import { Document } from 'mongoose';

export interface IQuotes extends Document{
    cotizacion_id:string;
    cliente_id:string;
    marca:string;
    descripcion:string;
    img:string[]
}