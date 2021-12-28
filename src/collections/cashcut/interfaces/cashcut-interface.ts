import { Document } from 'mongoose';

export interface ICashcut extends Document{
    caja_inicial:number;
    caja_final:number;
    deducciones:number;
    fecha:string;
    terminado:boolean;
    usuario_id:string;
    comentarios:string;
    corte_caja_id:string;
}