import * as mongoose from 'mongoose';

export const CustomersSchema = new mongoose.Schema({
    nombre:String,
    telefono1:String,
    telefono2:String
},{
    timestamps:true,
    collection:'clientes'
})
