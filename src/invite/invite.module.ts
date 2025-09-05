import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { Invite } from './entities/invite.entity';
import { Property } from 'src/property/entities/property.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Invite, Property])],
  providers: [InviteService],
  controllers: [InviteController],
})
export class InviteModule {}