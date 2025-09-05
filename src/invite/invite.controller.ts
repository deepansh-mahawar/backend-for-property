import { Controller, Post, Body } from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Invites')
@Controller('invites')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post()
  create(@Body() dto: CreateInviteDto) {
    return this.inviteService.create(dto);
  }
}
