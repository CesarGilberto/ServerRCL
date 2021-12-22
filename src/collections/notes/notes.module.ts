import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesSchema } from './schema/notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Note',
        schema: NotesSchema
      }
    ])
  ],
  providers: [NotesService],
  controllers: [NotesController]
})
export class NotesModule {}
