import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IQueryPages } from 'src/interfaces/query-pages.interface'
import { Repository } from 'typeorm'
import { CategoryModel } from '../entitries/category.entity'
import { CategoryStatusDTO, CreateCategoryDTO } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>
  ) {}

  /**
   * 分页获取分类数据
   *
   * @param {IQueryPages} query
   * @return {*}
   * @memberof CategoryService
   */
  async getCategoryList(query: IQueryPages) {
    let { current, pageSize } = query
    current = current ? current : 1
    pageSize = pageSize ? pageSize : 10

    const { status } = query

    const where = { status: null }
    if (status in [0, 1, 2]) {
      where.status = status
    } else {
      delete where.status
    }

    try {
      const [result, total] = await this.categoryRepository.findAndCount({
        select: [
          'id',
          'category_title',
          'alias_name',
          'description',
          'level',
          'parent_id',
          'status'
        ],
        where,
        skip: (current - 1) * pageSize,
        take: pageSize
      })

      return {
        code: HttpStatus.OK,
        message: 'success',
        data: {
          list: result,
          total,
          current: Number(current),
          size: Number(pageSize)
        }
      }
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: error.detail,
        data: {}
      }
    }
  }

  /**
   * 根据标题查找一个分类
   *
   * @param {string} cate
   * @return {*}
   * @memberof CategoryService
   */
  async findOne(cate: string) {
    const query = await this.categoryRepository.findOne({
      category_title: cate
    })
    return query
  }

  /**
   * 创建一个分类
   *
   * @param {CreateCategoryDTO} info
   * @return {*}
   * @memberof CategoryService
   */
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

  /**
   * 设置标签状态
   *
   * @param {CategoryStatusDTO} cateData
   * @return {*}
   * @memberof CategoryService
   */
  async setCateStatus(cateData: CategoryStatusDTO) {
    try {
      const cate = await this.categoryRepository.findOne({ id: cateData.id })
      if (!cate) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '您所要修改的分类数据不存在',
          data: ''
        }
      }
      cate.status = cateData.status
      const res = await this.categoryRepository.save(cate)
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: res
      }
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: error.detail,
        data: ''
      }
    }
  }
}
