import { Controller, Get, HttpStatus, InternalServerErrorException, Param, Res, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { ERole } from 'src/core/enums/role.enum';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(
        private notesService: NotesService,
        private ModuleRef:ModuleRef
    ) {}
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/')
    async getNotes(@Res() res: Response) {
        try {
            let notes = await this.notesService.getAll()
            res.status(HttpStatus.OK).json(notes);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    } 
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/:noteid')
    async getDetail(@Res() res: Response, @Param("noteid") noteid:string) {
        try {
            let notes = await this.notesService.getById(noteid)
            res.status(HttpStatus.OK).json(notes);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    } 
}
