import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '.prisma/client';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
