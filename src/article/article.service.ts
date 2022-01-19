import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'
import { ArticleModel } from '../entitries/article.entity'
import {
  CheckIdDTO,
  CreateArticleDTO,
  SetArticleStatusDTO,
  SetCategoryDTO,
  UpdateArticleDTO
} from './article.dto'
import { IArtCate, IQueryPages } from '../interfaces/query-pages.interface'
import { CategoryModel } from 'src/entitries/category.entity'

interface IListData {
  list: ArticleModel[]
  total: number
  current: number
  size: number
}

interface IListRes {
  code: HttpStatus
  message: string
  data: IListData
}
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleModel)
    private readonly articleRepository: Repository<ArticleModel>,
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>
  ) {}

  /**
   * 增加浏览量
   *
   * @private
   * @param {ArticleModel} query
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  private async findAndUpdate(query: ArticleModel): Promise<any> {
    query.views += 1
    return await this.articleRepository.save(query)
  }

  /**
   * 查询文章方法
   *
   * @private
   * @param {number} id
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  private async findById(id: number): Promise<any> {
    return await this.articleRepository.findOne({
      where: { id, isDroped: Not(0) }
    })
  }

  /**
   * 根据ID获取文章
   *
   * @param {number} id
   * @return {*}
   * @memberof ArticleService
   */
  async findArticleById(id: number) {
    try {
      const query = await this.findById(id)
      if (query) {
        await this.findAndUpdate(query)
      }
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: query || {}
      }
    } catch (error) {
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: {}
      }
    }
  }

  /**
   * 查询文章不重名
   *
   * @private
   * @param {string} title
   * @return {*} Promise<any>
   * @memberof ArticleService
   */
  private async findByName(title: string): Promise<any> {
    return await this.articleRepository.findOne({ title })
  }

  /**
   * 发布一篇文章
   *
   * @param {CreateArticleDTO} article
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async createArticle(article: CreateArticleDTO): Promise<any> {
    const query = await this.findByName(article.title)
    if (!query) {
      try {
        const art = new ArticleModel()
        art.title = article.title
        art.content = article.content

        const row = await this.articleRepository.save(art)

        return {
          code: HttpStatus.OK,
          message: 'success',
          data: row
        }
      } catch (error) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: error.detail,
          data: error
        }
      }
    } else {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '标题重复',
        data: ''
      }
    }
  }

  /**
   * 更新文章
   *
   * @param {UpdateArticleDTO} article
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async updateArticle(article: UpdateArticleDTO): Promise<any> {
    try {
      const art = await this.findById(article.id)
      if (!art) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '此ID的文章不存在，请确认',
          data: null
        }
      }
      art.title = article.title
      art.content = article.content
      const res = await this.articleRepository.save(art)
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: res
      }
    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.detail,
        data: ''
      }
    }
  }

  /**
   * 分页获取文章列表
   *
   * @param {IQueryPages} query
   * @return {*} Promise<any>
   * @memberof ArticleService
   */
  async getAllArticles(query: IQueryPages): Promise<any> {
    let { current, pageSize } = query
    current = current ? current : 1
    pageSize = pageSize ? pageSize : 10

    const { status } = query
    const where = { status, isDroped: Not(0) }
    if (status === null || status === undefined) {
      delete where.status
    }

    try {
      const [result, total] = await this.articleRepository.findAndCount({
        where,
        order: {
          created: 'DESC'
        },
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
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.detail,
        data: {}
      }
    }
  }

  /**
   * 设置状态
   *
   * @param {SetArticleStatusDTO} { id, status }
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async setStatus({ id, status }: SetArticleStatusDTO): Promise<any> {
    try {
      const art = await this.findById(id)
      if (!art) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '文章不存在，请检查。',
          data: null
        }
      }
      art.status = status
      const res = await this.articleRepository.save(art)

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

  /**
   * 设置文章所属分类
   *
   * @param {SetCategoryDTO} cateData
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async setCategory(cateData: SetCategoryDTO): Promise<any> {
    try {
      const art = await this.findById(cateData.id)
      if (!art) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '此ID文章不存在，请检查。',
          data: null
        }
      }
      // console.log(art)
      art.categoryId = cateData.categoryId
      const res = await this.articleRepository.save(art)

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

  /**
   * 删除文章
   *
   * @param {CheckIdDTO} dropid
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async removeArticle(dropid: CheckIdDTO): Promise<any> {
    try {
      const art = await this.findById(dropid.id)
      if (!art) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '此ID文章不存在，请检查。',
          data: null
        }
      }

      art.isDroped = 0
      await this.articleRepository.save(art)
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: null
      }
    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.detail,
        data: null
      }
    }
  }

  /**
   * 点赞
   *
   * @param {CheckIdDTO} fD
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async setFavorite(fD: CheckIdDTO): Promise<any> {
    try {
      const art = await this.findById(fD.id)
      if (!art) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '此ID文章不存在，请检查。',
          data: null
        }
      }

      art.like += 1
      const res = await this.articleRepository.save(art)
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

  async getByCategoryId(query: IArtCate): Promise<any> {
    try {
      let { current, pageSize } = query
      current = current ? current : 1
      pageSize = pageSize ? pageSize : 10

      if (!query.category && query.category !== 0) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '请检查分类ID',
          data: null
        }
      }

      const cate = await this.categoryRepository.findOne(query.category)
      if (!cate) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '没有这个分类，请检查后重试',
          data: null
        }
      }
      const [result, total] = await this.articleRepository.findAndCount({
        where: { categoryId: cate.id, isDroped: Not(0) },
        skip: (current - 1) * pageSize,
        take: pageSize
      })
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: {
          list: result,
          current,
          pageSize,
          total
        }
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
