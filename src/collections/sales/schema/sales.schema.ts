import * as mongoose from 'mongoose';

export const SaleSchema = new mongoose.Schema({
    corte_caja_id:String,
    fecha:String,
    productos:[{
        cantidad:Number,
        categoria:String,
        color:String,
        marca:String,
        nombre:String,
        precio:Number,
        producto_id:String,
        tam:String,
    }],
    venta_id:String
},{
    timestamps:true,
    collection:'ventas'
}
)