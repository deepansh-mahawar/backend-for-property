import { Property } from 'src/property/entities/property.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('invites')
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ default: false })
  accepted: boolean;

  @ManyToOne(() => Property, (property) => property.invites, {
    onDelete: 'CASCADE',
  })
  property: Property;
}
