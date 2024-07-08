import {Controller, Get} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CategoryDto} from './category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): Promise<CategoryDto[]> {
    return this.categoryService.findAll();
  }
}
