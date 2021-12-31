import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { MailjetService } from 'src/core/services/mailjet';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      }
    ])
  ],
  providers: [UsersService, MailjetService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
