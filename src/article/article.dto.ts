import { IsDefined, IsIn, IsNotEmpty, IsString } from 'class-validator'
import { StatusType } from 'src/entitries/entity.interface'

export class CreateArticleDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  content: string
}

export class CheckIdDTO {
  @IsNotEmpty()
  @IsDefined()
  id: number
}

export class SetArticleStatusDTO extends CheckIdDTO {
  @IsNotEmpty()
  @IsDefined()
  @IsIn(['0', '1', '2'])
  status: StatusType
}

export class UpdateArticleDTO extends CreateArticleDTO {
  @IsNotEmpty()
  @IsDefined()
  id: number
}

export class SetCategoryDTO extends CheckIdDTO {
  @IsNotEmpty()
  @IsDefined()
  categoryId: number
}
