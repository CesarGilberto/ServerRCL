import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IMovements } from "./interfaces/movements.interface";

@Injectable()
    export class MovementsService {
        constructor(
            @InjectModel('Movement') private readonly movementModel: Model<IMovements>
        ) {}
        async getAll(): Promise<Array<IMovements>> {
            return this.movementModel.find();
        }
    }
