import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './collections/users/users.module';
import { RolesModule } from './collections/roles/roles.module';
import { RolesGuard } from './core/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { NotesModule } from './collections/notes/notes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://karenojeda:Marissami1@reparacionesletys.qayop.mongodb.net/LetysDB', {
      useNewUrlParser: true
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    NotesModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
