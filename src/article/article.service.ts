import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ArticleModel } from '../entitries/article.entity'
import { CreateArticleDTO } from './article.dto'
import { IQueryPages } from '../interfaces/query-pages.interface'

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
    private readonly articleRepository: Repository<ArticleModel>
  ) {}

  private async findAndUpdate(query: ArticleModel) {
    query.views += 1
    return await this.articleRepository.save(query)
  }

  async findArticleById(id: number) {
    try {
      const query = await this.articleRepository.findOne(id)
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

  async findByName(title: string) {
    return await this.articleRepository.findOne({ title })
  }

  async createArticle(article: CreateArticleDTO) {
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

  async getAllArticles(query: IQueryPages) {
    let { current, pageSize } = query
    current = current ? current : 1
    pageSize = pageSize ? pageSize : 10

    try {
      const [result, total] = await this.articleRepository.findAndCount({
        skip: current,
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
}
