import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INotes } from './interfaces/notes-interface';


@Injectable()
export class NotesService {
    constructor(
        @InjectModel('Note') private readonly notesModel: Model<INotes>
    ) {}

    async getAll(query): Promise<Array<INotes>> {
        const filter = { }
        if(query.cliente_id){
            filter["cliente.cliente_id"]=query.cliente_id
        }
        if(query.delivered=="true"){
            filter["articulos.estado.nombre"]="Entregado"
        }        
        console.log(filter)
        console.log(query)
        return this.notesModel.find(filter);
    }
    async getById(_id):Promise<INotes>{
        return this.notesModel.findOne({nota_id:_id});
    }
}
