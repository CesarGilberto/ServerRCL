import { Controller, Get, HttpStatus, InternalServerErrorException, Res, UseGuards } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/core/decorators/roles.decorator";
import { ERole } from "src/core/enums/role.enum";
import { UsersService } from "../users/users.service";
import { CashcutsService } from "./cashcut.service";

@Controller('cashcuts')
export class CashcutController{
    private usersService:UsersService;
    constructor(
        private cashcutService:CashcutsService,
        private ModuleRef:ModuleRef
    ){}
    async onModuleInit(){
        this.usersService = this.ModuleRef.get(UsersService, {strict:false})
    }
@UseGuards(JwtAuthGuard)
@Roles(ERole.ADMINISTRADOR)
@Get('/')
    async getCashcut(@Res() res:Response){
        try {
            let cashcut = await this.cashcutService.getAll()
            cashcut = (await Promise.all(
                cashcut.map(async cashc=>{
                    return {
                        ...cashc, usuario_id: await this.usersService.getById(cashc.usuario_id)
                    }
                })
            )) as any
            res.status(HttpStatus.OK).json(cashcut)
        } catch (error) {
            throw new InternalServerErrorException(error.toString())
        }
    }
}