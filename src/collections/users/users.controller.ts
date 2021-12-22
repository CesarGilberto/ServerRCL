import { Body, Controller, Post, Res, InternalServerErrorException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { RolesService } from '../roles/roles.service';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { ModuleRef} from '@nestjs/core'
import { ERole } from 'src/core/enums/role.enum';

@Controller('users')
export class UsersController {
    private rolService:RolesService
    constructor(
        private userService: UsersService,
        private ModuleRef:ModuleRef
    ) {}
    async onModuleInit(){
        this.rolService = this.ModuleRef.get(RolesService, {strict:false})
    }

    @Post('/')
    async create(@Res() res: Response, @Body() userDto: UserDto) {
        let usuario = await this.userService.getByEmail(userDto.usuario)
        if (usuario) {
            throw new BadRequestException("Ya existe este usuario")
        }
        try {
            let rol = await this.rolService.getByDescription(ERole.CLIENTE)
            userDto.rol_id = rol.rol_id
            await this.userService.create(userDto);

            res.status(HttpStatus.CREATED).json({ message: 'user created' });
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    } 
}
