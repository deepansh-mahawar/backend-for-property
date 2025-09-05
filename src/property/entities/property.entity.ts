import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Invite } from 'src/invite/entities/invite.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'b3c9e5d2-1f2b-4f0e-9d88-2a9b6b7c5f3d' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'Luxury Apartment' })
  name: string;

  @Column()
  @ApiProperty({ example: '123 Main Street' })
  address: string;

  @Column()
  @ApiProperty({ example: 'Mumbai' })
  city: string;

  @Column()
  @ApiProperty({ example: 'Maharashtra' })
  state: string;

  @Column()
  @ApiProperty({ example: '400001' })
  pincode: string;

  @Column()
  @ApiProperty({ example: 'India' })
  country: string;

  @Column()
  @ApiProperty({ example: 'John Doe' })
  ownerName: string;

  @Column('int')
  @ApiProperty({ example: 3 })
  numberOfRooms: number;

  @Column('decimal')
  @ApiProperty({ example: 1200 })
  area: number;

  @Column('decimal')
  @ApiProperty({ example: 25000 })
  rent: number;

  @OneToMany(() => Invite, (invite) => invite.property, { cascade: true })
  invites: Invite[];

  @CreateDateColumn()
  @ApiProperty({ example: '2025-09-05T12:00:00Z' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2025-09-05T12:30:00Z' })
  updatedAt: Date;
}
