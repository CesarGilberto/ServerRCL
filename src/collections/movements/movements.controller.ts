import { Controller, Get, HttpStatus, InternalServerErrorException, Res, UseGuards } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/core/decorators/roles.decorator";
import { ERole } from "src/core/enums/role.enum";
import { UsersService } from "../users/users.service";
import { MovementsService } from "./movements.service";

@Controller('movements')
export class MovementsController{
    private usersService:UsersService;
    constructor(
        private movementsService: MovementsService,
        private ModuleRef:ModuleRef
    ){}
    async onModuleInit(){
        this.usersService = this.ModuleRef.get(UsersService, {strict:false})
    }
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.ADMINISTRADOR)
    @Get('/')
    async getMovements(@Res() res: Response){
        try{
            let movements = await this.movementsService.getAll()
            movements = (await Promise.all(
                movements.map(async movement=>{
                    return {
                        ...movement, usuario_id: await this.usersService.getById(movement.usuario_id)
                    }
                })
            )) as any
            res.status(HttpStatus.OK).json(movements);
        }catch(error){
            throw new InternalServerErrorException(error.toString())
        }
        
    }
}