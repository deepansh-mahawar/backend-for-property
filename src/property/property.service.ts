import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
  ) {}

  create(createPropertyDto: CreatePropertyDto) {
    const property = this.propertyRepo.create(createPropertyDto);
    return this.propertyRepo.save(property);
  }

  findAll() {
    return this.propertyRepo.find();
  }

  async findOne(id: string) {
    const property = await this.propertyRepo.findOne({ where: { id } });
    if (!property) throw new NotFoundException('Property not found');
    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    await this.propertyRepo.update(id, updatePropertyDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const property = await this.findOne(id);
    return this.propertyRepo.remove(property);
  }
}
