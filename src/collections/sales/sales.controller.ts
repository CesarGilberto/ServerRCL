import { Controller, Get, HttpStatus, InternalServerErrorException, Param, Res, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { ERole } from 'src/core/enums/role.enum';
import { SalesService } from './sales.service';
@Controller('sales')
export class SalesController {
    constructor(
        private saleService: SalesService,
        private ModuleRef: ModuleRef
    ) { }

    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/')
    async getSales(@Res() res: Response) {
        try {
            let sales = await this.saleService.getAll()
            res.status(HttpStatus.OK).json(sales);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    }
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/:saleid')
    async getDetail(@Res() res: Response, @Param("saleid") saleid:string) {
        try {
            let sales = await this.saleService.getById(saleid)
            res.status(HttpStatus.OK).json(sales);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    } 
}