import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleModel } from '../entitries/article.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ArticleModel])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
