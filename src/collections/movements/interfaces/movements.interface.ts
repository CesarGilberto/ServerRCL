import { Document } from 'mongoose';

export interface IMovements extends Document{
    descripcion:string,
    fecha:string,
    log_movimiento_id:string,
    usuario_id:string
}