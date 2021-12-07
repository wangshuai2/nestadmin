import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  categoryTitle: string

  @IsString()
  aliasName: string

  @IsString()
  description: string
}
