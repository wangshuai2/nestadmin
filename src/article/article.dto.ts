import { IsNotEmpty, IsString } from 'class-validator'

export class CreateArticleDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  content: string
}
