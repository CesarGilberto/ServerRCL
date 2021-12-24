import * as mongoose from 'mongoose';

export const ServicesSchema = new mongoose.Schema({
    reparacion_id: String,
    nombre:String,
    precio:Number
}, {
    timestamps: true,
    collection: 'reparaciones'
});