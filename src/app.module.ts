import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './collections/users/users.module';
import { RolesModule } from './collections/roles/roles.module';
import { RolesGuard } from './core/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { NotesModule } from './collections/notes/notes.module';
import { ProductsController } from './collections/products/products.controller';
import { ProductsService } from './collections/products/products.service';
import { ProductsModule } from './collections/products/products.module';
require('dotenv').config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGOENV, {
      useNewUrlParser: true
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    NotesModule,
    ProductsModule
  ],
  controllers: [AppController, ProductsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    ProductsService,
  ],
})
export class AppModule {}
