import { Controller, Get, HttpStatus, InternalServerErrorException, Res, UseGuards } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/core/decorators/roles.decorator";
import { ERole } from "src/core/enums/role.enum";
import { CashcutsService } from "./cashcut.service";

@Controller('cashcuts')
export class CashcutController{
    constructor(
        private cashcutService:CashcutsService,
        private ModuleRef:ModuleRef
    ){}

@UseGuards(JwtAuthGuard)
@Roles(ERole.ADMINISTRADOR)
@Get('/')

    async getCashcut(@Res() res:Response){
        try {
            let cashcut = await this.cashcutService.getAll()
            res.status(HttpStatus.OK).json(cashcut)
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    }
}