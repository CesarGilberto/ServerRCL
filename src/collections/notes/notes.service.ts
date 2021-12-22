import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INotes } from './interfaces/notes-interface';


@Injectable()
export class NotesService {
    constructor(
        @InjectModel('Note') private readonly notesModel: Model<INotes>
    ) {}

    async getAll(): Promise<Array<INotes>> {
        return this.notesModel.find();
    }
    async getById(_id):Promise<INotes>{
        return this.notesModel.findOne({nota_id:_id});
    }
}
