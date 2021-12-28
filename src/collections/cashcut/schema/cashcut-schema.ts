import * as mongoose from "mongoose";

export const CashcutSchema = new mongoose.Schema({
    caja_inicial:Number,
    caja_final:Number,
    deducciones:Number,
    fecha:String,
    terminado:Boolean,
    usuario_id:String,
    comentarios:String,
    corte_caja_id:String
},{
    timestamps:true,
    collection:'corte_caja'
}
)