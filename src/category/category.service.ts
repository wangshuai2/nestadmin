import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ArticleModel } from 'src/entitries/article.entity'
import { IQueryPages } from 'src/interfaces/query-pages.interface'
import { Repository } from 'typeorm'
import { CategoryModel } from '../entitries/category.entity'
import {
  CategoryStatusDTO,
  CreateCategoryDTO,
  DeleteCategoryDto,
  UpdateCategoryDto
} from './category.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>,
    @InjectRepository(ArticleModel)
    private readonly articleRepository: Repository<ArticleModel>
  ) {}

  /**
   * 分页获取分类数据
   *
   * @param {IQueryPages} query
   * @return {*}  {Promise<any>}
   * @memberof CategoryService
   */
  async getCategoryList(query: IQueryPages): Promise<any> {
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
          'categoryTitle',
          'aliasName',
          'description',
          'level',
          'parentId',
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
   * 根据标题查找一个分类，避免重名使用
   *
   * @param {string} cate
   * @return {CategoryModel}  {Promise<CategoryModel>}
   * @memberof CategoryService
   */
  async findOne(cate: string): Promise<CategoryModel> {
    const query = await this.categoryRepository.findOne({
      categoryTitle: cate
    })
    return query
  }

  /**
   * 创建一个分类
   *
   * @param {CreateCategoryDTO} info
   * @return {*}  {Promise<any>}
   * @memberof CategoryService
   */
  async createCate(info: CreateCategoryDTO): Promise<any> {
    const isHas = await this.findOne(info.categoryTitle)
    if (!isHas) {
      const cate = new CategoryModel()
      cate.categoryTitle = info.categoryTitle
      cate.aliasName = info.aliasName
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
   * 根据分类ID查询文章
   *
   * @private
   * @param {number} cateId
   * @return {*}  {Promise<any>}
   * @memberof CategoryService
   */
  private async findArticleByCateId(cateId: number): Promise<any> {
    return await this.articleRepository.find({ where: { category_id: cateId } })
  }

  /**
   * 设置标签状态
   *
   * @param {CategoryStatusDTO} cateData
   * @return {*}
   * @memberof CategoryService
   */
  async setCateStatus(cateData: CategoryStatusDTO): Promise<any> {
    try {
      const articleList = await this.findArticleByCateId(cateData.id)
      if (!articleList) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '此分类下包含有文章数据，不可修改状态'
        }
      }
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

  /**
   * 删除分类
   *
   * @param {DeleteCategoryDto} cateData
   * @return {*}  {Promise<any>}
   * @memberof CategoryService
   */
  async deleteCategory(cateData: DeleteCategoryDto): Promise<any> {
    try {
      const articleList = await this.findArticleByCateId(cateData.id)
      if (!articleList) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '此分类下包含有文章数据，不可删除'
        }
      }
      const cate = await this.categoryRepository.findOne({ id: cateData.id })
      if (!cate) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '您所要删除的分类数据不存在',
          data: ''
        }
      }

      await this.categoryRepository.remove(cate)
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: null
      }
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: error.detail,
        data: ''
      }
    }
  }

  /**
   * 根据分类ID获取分类数据
   *
   * @private
   * @param {number} id
   * @return {CategoryModel}  {Promise<CategoryModel>}
   * @memberof CategoryService
   */
  private async findById(id: number): Promise<CategoryModel> {
    return await this.categoryRepository.findOne({
      select: ['id', 'categoryTitle', 'aliasName', 'description'],
      where: { id }
    })
  }

  /**
   * 更新分类信息
   *
   * @param {UpdateCategoryDto} data
   * @return {*}  {Promise<any>}
   * @memberof CategoryService
   */
  async upateCategory(data: UpdateCategoryDto): Promise<any> {
    try {
      const nowData = await this.findById(data.id)
      delete data.id
      Object.assign(nowData, data)
      console.log(nowData)
      // nowData.category_title = data.categoryTitle
      // nowData.alias_name = data.aliasName || nowData.aligs_name
      // nowData.description = data.description || nowData.description

      const res = await this.categoryRepository.save(nowData)
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: res
      }
    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.detail,
        data: null
      }
    }
  }

  async getAllCategory(): Promise<any> {
    try {
      const res = await this.categoryRepository.find({
        select: ['id', 'categoryTitle', 'aliasName', 'description'],
        where: { status: 1 }
      })
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: res
      }
    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.detail,
        data: null
      }
    }
  }
}
