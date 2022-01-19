import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ArticleService } from './article.service'
import {
  CheckIdDTO,
  CreateArticleDTO,
  SetArticleStatusDTO,
  SetCategoryDTO,
  UpdateArticleDTO
} from './article.dto'
import { IArtCate, IQueryPages } from '../interfaces/query-pages.interface'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 根据ID获取文章详情
  @Get('/articleDetail')
  async detail(@Query('id') id) {
    return await this.articleService.findArticleById(id)
  }

  // 发布文章
  @Post('/createArticle')
  async create(@Body() article: CreateArticleDTO) {
    return await this.articleService.createArticle(article)
  }

  // 分页获取文章列表
  @Get('/articleList')
  async articlelist(@Query() query: IQueryPages) {
    return await this.articleService.getAllArticles(query)
  }

  // 设置文章状态
  @Post('/setArticleStatus')
  async setStatus(@Body() statusData: SetArticleStatusDTO) {
    return await this.articleService.setStatus(statusData)
  }

  // 更新文章
  @Post('/updateArticle')
  async updateArticle(@Body() article: UpdateArticleDTO) {
    return await this.articleService.updateArticle(article)
  }

  // 设置文章分类
  @Post('/setArticleCategory')
  async setCategory(@Body() cateData: SetCategoryDTO) {
    return await this.articleService.setCategory(cateData)
  }

  // 删除文章
  @Post('/removeArticle')
  async removeArticle(@Body() dropid: CheckIdDTO) {
    return await this.articleService.removeArticle(dropid)
  }

  // 给文章点赞
  @Post('/favorite')
  async setFavorite(@Body() fD: CheckIdDTO) {
    return await this.articleService.setFavorite(fD)
  }

  @Get('/getArticleByCategory')
  async getByCategoryId(@Query() query: IArtCate) {
    return await this.articleService.getByCategoryId(query)
  }
}
