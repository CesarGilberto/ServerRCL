import { Body, Controller, Post, Res, InternalServerErrorException, HttpStatus, BadRequestException, Get, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { RolesService } from '../roles/roles.service';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { ModuleRef} from '@nestjs/core'
import { ERole } from 'src/core/enums/role.enum';
import { MailjetService } from 'src/core/services/mailjet';
import { ETemplatesMailjet } from 'src/core/enums/templates-mailjet.enum';
import { Roles } from 'src/core/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CustomersService } from '../customers/customers.service';
import { generateUUID } from 'src/core/utils/utils';

@Controller('users')
export class UsersController {
    private rolService:RolesService
    private customerService:CustomersService
    constructor(
        private userService: UsersService,
        private ModuleRef:ModuleRef,
        private mailJetService:MailjetService
    ) {}
    async onModuleInit(){
        this.rolService = this.ModuleRef.get(RolesService, {strict:false})
        this.customerService = this.ModuleRef.get(CustomersService, {strict:false})
    }
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/empleados')
    async getEmployees(@Res() res: Response) {
        try {
            let rol = await this.rolService.getByDescription(ERole.EMPLEADO)
            let employees = await this.userService.getByRol(rol.rol_id)
            res.status(HttpStatus.OK).json(employees);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    }
    @Post('/')
    async create(@Res() res: Response, @Body() userDto: UserDto) {
        let usuario = await this.userService.getByEmail(userDto.correo)
        if (usuario) {
            throw new BadRequestException("Ya existe este usuario")
        }
        try {
            let rol = await this.rolService.getByDescription(ERole.CLIENTE)
            userDto.usuario_id=generateUUID()
            userDto.rol_id = rol.rol_id
            const user = await this.userService.create(userDto);
            await this.customerService.create({
                usuario_id:user.usuario_id,
                cliente_id:generateUUID(),  
                nombre:userDto.nombre,
                telefono1:userDto.telefono,
                telefono2:"1111111111"
            })
            
            res.status(HttpStatus.CREATED).json({ message: 'user created' });
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    } 
    @Post('/recovery-password')
    async recoveryPass(@Res() res: Response, @Body() userDto: UserDto) {
        console.log(userDto.correo)
        let usuario = await this.userService.getByEmail(userDto.correo.trim())
        console.log(usuario)
        if (!usuario) {
            throw new BadRequestException("No se encontró un usuario con ese correo")
        }
        try {
            try {
                this.mailJetService.sendEmail({
                    Messages: [
                        {
                            To: [
                                {
                                    Email: usuario.correo,
                                    Name: usuario.nombre,
                                }
                            ],
                            TemplateID: ETemplatesMailjet.DEFAULT_PASSWORD,
                            TemplateLanguage: true,
                            Subject: 'Recuperación de cuenta',
                            Variables: {
                                contrasena: usuario.contrasena,
                            }
                        }
                    ]
                });
            } catch (error) {}

            res.status(HttpStatus.CREATED).json({ message: 'user created' });
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    } 
}
