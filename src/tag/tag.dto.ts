import { IsNotEmpty, IsString } from 'class-validator'

export class AddTagDTO {
  @IsString()
  @IsNotEmpty()
  tagName: string

  @IsString()
  aliasName: string

  @IsString()
  description: string
}
