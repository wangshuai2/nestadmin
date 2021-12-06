import { HttpStatus, Injectable } from '@nestjs/common'
import { TagsModel } from '../entitries/tags.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { AddTagDTO } from './tag.dto'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagsModel)
    private readonly tagRepository: Repository<TagsModel>
  ) {}

  async allTags() {
    const query = await this.tagRepository.find()
    return {
      code: HttpStatus.OK,
      message: 'success',
      data: query
    }
  }

  async findById(id: number | string | null | undefined) {
    try {
      const query = await this.tagRepository.find({ where: { id } })
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: query
      }
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'error',
        data: error.detail
      }
    }
  }

  private async findOneTag(tagName: string) {
    return await this.tagRepository.findOne({ tag_name: tagName })
  }

  async createOneTag({ tagName, aliasName, description }: AddTagDTO) {
    const isHasName = await this.findOneTag(tagName)

    if (isHasName) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: `标签“${tagName}”已存在`,
        data: ''
      }
    } else {
      const tag = new TagsModel()
      tag.tag_name = tagName
      tag.alias_name = aliasName
      tag.description = description

      const result = await this.tagRepository.save(tag)
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: result
      }
    }
  }
}
