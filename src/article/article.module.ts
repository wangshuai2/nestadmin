import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleModel } from '../entitries/article.entity'
import { CategoryModel } from 'src/entitries/category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ArticleModel, CategoryModel])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
