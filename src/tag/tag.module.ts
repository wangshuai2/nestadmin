import { Module } from '@nestjs/common'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagsModel } from 'src/entitries/tags.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TagsModel])],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
