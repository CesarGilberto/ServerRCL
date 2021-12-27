import * as mongoose from 'mongoose';

export const MovementsSchema = new mongoose.Schema({
    descripcion:String,
    fecha:String,
    log_movimiento_id:String,
    usuario_id:String
}, {
    timestamps: true,
    collection: 'log_movimientos'
});