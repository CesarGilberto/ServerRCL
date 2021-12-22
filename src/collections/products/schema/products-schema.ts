import * as mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
    cantidad: Number,
    categoria:String,
    color:String,
    marca:String,
    nombre:String,
    precio:Number,
    producto_id:String,
    tam:String,
}, {
    timestamps: true,
    collection: 'productos'
});