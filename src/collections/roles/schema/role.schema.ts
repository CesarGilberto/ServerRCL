import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
    rol_id:String,
    descripcion:String
}, {
    timestamps: true,
    collection: 'roles'
});