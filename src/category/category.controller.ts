import { Body, Controller, Post } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDTO } from './category.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/createCategory')
  async create(@Body() cateData: CreateCategoryDTO) {
    return this.categoryService.createCate(cateData)
  }
}
