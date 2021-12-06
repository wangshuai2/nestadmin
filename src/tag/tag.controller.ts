import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AddTagDTO } from './tag.dto'
import { TagService } from './tag.service'

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get('/list')
  async getAll() {
    return await this.tagService.allTags()
  }

  @Get('/tagDetail')
  async tagById(@Query() query) {
    console.log(query)
    console.log(query.id)
    const id = query.id
    return await this.tagService.findById(id)
  }

  @Post('/createTag')
  async createTag(@Body() tagData: AddTagDTO) {
    return await this.tagService.createOneTag(tagData)
  }
}
