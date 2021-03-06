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
import { ServicesModule } from './collections/services/services.module';
import { MovementsModule } from './collections/movements/movements.module';
import { CashcutModule } from './collections/cashcut/cashcut.module';
import { SalesModule } from './collections/sales/sales.module';
import { ConfigModule } from '@nestjs/config';
import { QuotesModule } from './collections/quotes/quotes.module';

require('dotenv').config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGOENV, {
      useNewUrlParser: true
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    NotesModule,
    ProductsModule,
    CustomersModule,
    ServicesModule,
    MovementsModule,
    CashcutModule,
    SalesModule,
    QuotesModule
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
