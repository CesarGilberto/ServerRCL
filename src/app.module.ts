import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './collections/users/users.module';
import { RolesModule } from './collections/roles/roles.module';
import { RolesGuard } from './core/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { NotesModule } from './collections/notes/notes.module';
import { ProductsModule } from './collections/products/products.module';
import { CustomersModule } from './collections/customers/customers.module';
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
    ProductsModule,
    CustomersModule
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
