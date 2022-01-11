import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from 'src/collections/roles/roles.service';
import { IUser } from 'src/collections/users/interfaces/user.interface';
import { IPayload } from 'src/core/interfaces/payload.interface';
import { UsersService } from '../collections/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private roleService:RolesService
    ) {}

    async validateUser(username: string, password: string): Promise<IUser> {
        const user = await this.usersService.getByEmail(username);

        if (!user) return null;

        const isMatch = user.contrasena==password

        return isMatch ? user : null;
    }

    async login(user: IUser) {
        const role= await this.roleService.getById(user.rol_id)
        const payload: IPayload = {
            username: user.usuario,
            userId: user.usuario_id,
            role: role.descripcion
        };
        console.log(role)
        return {
            token: this.jwtService.sign(payload),
            user: {
                _id: user.usuario_id,
                name: user.nombre,
                role: role.descripcion
            }
        }
    }

    decode(token: string): IPayload {
        return this.jwtService.decode(token) as IPayload;
    }
}
