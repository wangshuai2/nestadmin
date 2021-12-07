import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDTO } from './article.dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/articleDetail')
  async detail(@Query('id') id) {
    return await this.articleService.findArticleById(id)
  }

  @Post('/createArticle')
  async create(@Body() article: CreateArticleDTO) {
    return this.articleService.createArticle(article)
  }
}
