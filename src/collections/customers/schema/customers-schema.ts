import * as mongoose from 'mongoose';

export const CustomersSchema = new mongoose.Schema({
    cliente_id:String,
    nombre:String,
    telefono1:String,
    telefono2:String,
    usuario_id:String
},{
    timestamps:true,
    collection:'clientes'
})
