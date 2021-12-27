import { Controller, Get, HttpStatus, InternalServerErrorException, Res, UseGuards } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/core/decorators/roles.decorator";
import { ERole } from "src/core/enums/role.enum";
import { MovementsService } from "./movements.service";

@Controller('movements')
export class MovementsController{
    constructor(
        private movementsService: MovementsService,
        private ModuleRef:ModuleRef
    ){}
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/')
    async getMovements(@Res() res: Response){
        try{
            let movements = await this.movementsService.getAll()
            res.status(HttpStatus.OK).json(movements);
        }catch(error){
            throw new InternalServerErrorException(error.toString())
        }
        
    }
}