import { Controller, Get, HttpStatus, InternalServerErrorException, Param, Res, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { ERole } from 'src/core/enums/role.enum';
import { ServicesService } from './services.service';

@Controller('servics')
export class ServicesController {
    constructor(
        private servicesService: ServicesService,
        private ModuleRef: ModuleRef
    ) { }

    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/')
    async getServices(@Res() res: Response) {
        try {
            let services = await this.servicesService.getAll()
            res.status(HttpStatus.OK).json(services);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    }
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/:serviceid')
    async getDetail(@Res() res: Response, @Param("serviceid") serviceid: string) {
        try {
            let services = await this.servicesService.getById(serviceid)
            res.status(HttpStatus.OK).json(services);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    }
}