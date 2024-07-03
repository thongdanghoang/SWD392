import {Controller, Get} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CategoryEntity} from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }
}
