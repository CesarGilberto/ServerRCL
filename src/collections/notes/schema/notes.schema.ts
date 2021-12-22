import * as mongoose from 'mongoose';

export const NotesSchema = new mongoose.Schema({
    anticipo: Number,
    articulos: [{
        articulo_id: String,
        cantidad: Number,
        color: String,
        comentario: String,
        estado: {
            estado_id: String,
            nombre: String,
            procesos: [{
                nombre: String,
                proceso_id: String,
                subprocesos: [{
                    encargado: String,
                    nombre: String,
                    subproceso_id: String,
                    terminado: Boolean,
                    tiempo: String
                }]
            }]
        },
        fecha_entrega: String,
        foto: String,
        marca: String,
        nombre: String,
        reparaciones_id: [{
            type: String
        }],
        tipo_usuario: String,
    }],
    cliente: {
        cliente_id: String,
        nombre: String,
        telefono1: String,
        telefono2: String
    },
    corte_caja_id: String,
    descuento: Number,
    fecha_llegada: String,
    nota_id: String,
    numero: Number,
    abonos: [{
        abono_id: String,
        cantidad: Number,
        corteCaja_id: String,
        fecha: String
    }]
}, {
    timestamps: true,
    collection: 'notas'
});