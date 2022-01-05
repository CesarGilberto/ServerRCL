import { Controller, Get, HttpStatus, InternalServerErrorException, Param, Res, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { ERole } from 'src/core/enums/role.enum';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService,
        private ModuleRef: ModuleRef
    ) { }

    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR, ERole.CLIENTE)
    @Get('/')
    async getProducts(@Res() res: Response) {
        try {
            let products = await this.productsService.getAll()
            res.status(HttpStatus.OK).json(products);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    }
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/:productid')
    async getDetail(@Res() res: Response, @Param("productid") productid: string) {
        try {
            let products = await this.productsService.getById(productid)
            res.status(HttpStatus.OK).json(products);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    }
}