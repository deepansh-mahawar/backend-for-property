import { ApiProperty } from '@nestjs/swagger';

export class CreateInviteDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  propertyId: string;
}
