import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateInviteDto } from './dto/create-invite.dto';

import * as nodemailer from 'nodemailer';
import { Invite } from './entities/invite.entity';
import { Property } from 'src/property/entities/property.entity';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(Invite)
    private readonly inviteRepo: Repository<Invite>,
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
  ) {}

  async create(dto: CreateInviteDto) {
    const property = await this.propertyRepo.findOne({
      where: { id: dto.propertyId },
    });
    if (!property) throw new Error('Property not found');

    const invite = this.inviteRepo.create({ email: dto.email, property });
    await this.inviteRepo.save(invite);

    // send email
    await this.sendEmail(dto.email, property.name);

    return invite;
  }

  private async sendEmail(email: string, propertyName: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Property Invites" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Invitation to join ${propertyName}`,
      text: `You are invited to join property: ${propertyName}`,
    });
  }
}
