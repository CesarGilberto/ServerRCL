import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    usuario_id:String,
    nombre:String,
    telefono:String,
    usuario:String,
    contrasena:String,
    rol_id:String,
    turno:String
}, {
    timestamps: true,
    collection: 'usuarios'
});
