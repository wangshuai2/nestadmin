import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDTO } from './article.dto'
import { IQueryPages } from '../interfaces/query-pages.interface'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/articleDetail')
  async detail(@Query('id') id) {
    return await this.articleService.findArticleById(id)
  }

  @Post('/createArticle')
  async create(@Body() article: CreateArticleDTO) {
    return await this.articleService.createArticle(article)
  }

  @Get('/articleList')
  async articlelist(@Query() query: IQueryPages) {
    return await this.articleService.getAllArticles(query)
  }

  // @Get('/setArticleStatus')
}
