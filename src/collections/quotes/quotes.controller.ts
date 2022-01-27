import { Body, Controller, Get, HttpStatus, InternalServerErrorException, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/core/decorators/roles.decorator";
import { ERole } from "src/core/enums/role.enum";
import { IPayload } from "src/core/interfaces/payload.interface";
import { generateUUID } from "src/core/utils/utils";
import { CustomersService } from "../customers/customers.service";
import { RolesService } from "../roles/roles.service";
import { QuotesDto } from "./dto/quotes.dto";
import { QuotesService } from "./quotes.service";

@Controller('quotes')
export class QuotesController {
    private rolService:RolesService
    private customerService:CustomersService
    constructor(
        private quotesService: QuotesService,
        private ModuleRef: ModuleRef
    ) { }
    async onModuleInit(){
        this.rolService = this.ModuleRef.get(RolesService, {strict:false})
        this.customerService = this.ModuleRef.get(CustomersService, {strict:false})
    }
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/')
    async getQuotes(@Res() res: Response) {
        try {
        let quotes = await this.quotesService.getAll()
            res.status(HttpStatus.OK).json(quotes);
            } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }   
    }
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.CLIENTE)
    @Post('/')
    async create(@Res() res: Response, @Body() quotesDto: QuotesDto, @Req() req) {
        let session:IPayload=req.user
        let usuario = await this.customerService.getByUser(session.userId)
        try {
            quotesDto.cliente_id=usuario.cliente_id
            quotesDto.cotizacion_id=generateUUID()
            const user = await this.quotesService.create(quotesDto);
            res.status(HttpStatus.CREATED).json({ message: 'quote created' });
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    } 
}