import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './schema/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Role',
        schema: RoleSchema
      }
    ])
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
