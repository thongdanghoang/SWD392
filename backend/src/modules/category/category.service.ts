import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CategoryEntity} from './category.entity';
import {CategoryDto} from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.find();
    return categories.map(category => {
      const dto = new CategoryDto();
      dto.id = category.id;
      dto.version = category.version;
      dto.title = category.title;
      dto.image = category.image;
      return dto;
    });
  }
}
