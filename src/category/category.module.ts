import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryModel } from '../entitries/category.entity'
import { ArticleModel } from 'src/entitries/article.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryModel, ArticleModel])],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
