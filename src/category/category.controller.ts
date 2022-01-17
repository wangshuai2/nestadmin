import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryStatusDTO, CreateCategoryDTO } from './category.dto'
import { IQueryPages } from 'src/interfaces/query-pages.interface'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/categoryList')
  async getList(@Query() query: IQueryPages) {
    return await this.categoryService.getCategoryList(query)
  }

  @Post('/createCategory')
  async create(@Body() cateData: CreateCategoryDTO) {
    return await this.categoryService.createCate(cateData)
  }

  @Post('/setCateStatus')
  async setCateStatus(@Body() cateData: CategoryStatusDTO) {
    return await this.categoryService.setCateStatus(cateData)
  }
}
