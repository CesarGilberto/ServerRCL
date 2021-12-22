export class NotesDto {
    anticipo: number;
    articulos: [{
        articulo_id: string;
        cantidad: number;
        color: string;
        comentario: string;
        estado: {
            estado_id: string;
            nombre: string;
            procesos: [{
                nombre: string;
                proceso_id: string;
                subprocesos: [{
                    encargado: string;
                    nombre: string;
                    subproceso_id: string;
                    terminado: boolean;
                    tiempo: string
                }]
            }]
        };
        fecha_entrega: string;
        foto: string;
        marca: string;
        nombre: string;
        reparaciones_id: [{
            type: string
        }];
        tipo_usuario: string;
    }];
    cliente: {
        cliente_id: string;
        nombre: string;
        telefono1: string;
        telefono2: string
    };
    corte_caja_id: string;
    descuento: number;
    fecha_llegada: string;
    nota_id: string;
    numero: number;
    abonos: [{
        abono_id: string;
        cantidad: number;
        corteCaja_id: string;
        fecha: string
    }]
}