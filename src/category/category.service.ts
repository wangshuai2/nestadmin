import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryModel } from '../entitries/category.entity'
import { CreateCategoryDTO } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>
  ) {}

  async findOne(cate: string) {
    const query = await this.categoryRepository.findOne({
      category_title: cate
    })
    return query
  }

  async createCate(info: CreateCategoryDTO) {
    const isHas = await this.findOne(info.categoryTitle)
    if (!isHas) {
      const cate = new CategoryModel()
      cate.category_title = info.categoryTitle
      cate.alias_name = info.aliasName
      cate.description = info.description

      const res = await this.categoryRepository.save(cate)
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: res
      }
    } else {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '分类名称重复',
        data: ''
      }
    }
  }
}
