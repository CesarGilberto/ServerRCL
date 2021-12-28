import { Controller, Get, HttpStatus, InternalServerErrorException, Param, Res, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { ERole } from 'src/core/enums/role.enum';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
    constructor(
        private customerService: CustomersService,
        private ModuleRef: ModuleRef
    ) { }

    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/')
    async getCustomers(@Res() res: Response) {
        try {
            let customers = await this.customerService.getAll()
            res.status(HttpStatus.OK).json(customers);
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    }
    // @UseGuards(JwtAuthGuard)
    // @Roles(ERole.ADMINISTRADOR)
    // @Get('/:customerid')
    // async getCustomers(@Res() res: Response, @Param("customerid") customerid: string) {
    //     try {
    //         let customers = await this.customerService.getById(customerid)
    //         res.status(HttpStatus.OK).json(customers);
    //     } catch (error) {
    //         throw new InternalServerErrorException(error.toString())
    //     }
    // }
}