import { IRole } from 'src/collections/roles/interfaces/role.interface';

export interface IUser {
    usuario_id:string,
    nombre:string,
    telefono:string,
    usuario:string,
    correo:string,
    contrasena:string,
    rol_id:string,
    turno:string
}