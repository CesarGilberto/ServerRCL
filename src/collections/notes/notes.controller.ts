import { Controller, Get, HttpStatus, InternalServerErrorException, Query, Param, Res, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { ERole } from 'src/core/enums/role.enum';
import { NotesService } from './notes.service';
import { IPayload } from 'src/core/interfaces/payload.interface';
import { CustomersService } from '../customers/customers.service';


@Controller('notes')
export class NotesController {
    customerService: CustomersService
    constructor(
        private notesService: NotesService,
        private ModuleRef: ModuleRef
    ) { }
    async onModuleInit() {
        this.customerService = this.ModuleRef.get(CustomersService, { strict: false })
    }
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR, ERole.CLIENTE)
    @Get('/')
    async getNotes(@Res() res: Response, @Req() req, @Query() query) {
        let session: IPayload = req.user
        if (session.role == ERole.CLIENTE) {
            const customer = await this.customerService.getByUser(session.userId)
            if (!customer) {
                throw new BadRequestException("No existe este usuario")
            }
        query.cliente_id=customer.cliente_id    
        } 
        try {
            
            let notes = await this.notesService.getAll(query)
            res.status(HttpStatus.OK).json(notes);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    }
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR,  ERole.CLIENTE)
    @Get('/:noteid')
    async getDetail(@Res() res: Response, @Param("noteid") noteid: string) {
        try {
            let notes = await this.notesService.getById(noteid)
            res.status(HttpStatus.OK).json(notes);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    }
}
