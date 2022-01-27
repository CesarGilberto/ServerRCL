import * as mongoose from 'mongoose';

export const QuotesSchema = new mongoose.Schema({
    cotizacion_id:String,
    cliente_id:String,
    marca:String,
    descripcion:String,
    img:[String]
},{
    timestamps:true,
    collection:'cotizaciones'
})