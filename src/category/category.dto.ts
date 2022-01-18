import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'
import { StatusType } from 'src/entitries/entity.interface'

/**
 * 创建分类
 *
 * @export
 * @class CreateCategoryDTO
 */
export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  categoryTitle: string

  @IsOptional()
  @IsString()
  aliasName: string

  @IsOptional()
  @IsString()
  description: string
}

export class CategoryStatusDTO {
  @IsNotEmpty()
  @IsDefined()
  id: number

  @IsNotEmpty()
  @IsIn(['0', '1', '2'])
  status: StatusType
}

export class UpdateCategoryDto extends CreateCategoryDTO {
  @IsNotEmpty()
  @IsDefined()
  id: number
}

export class DeleteCategoryDto {
  @IsNotEmpty()
  @IsDefined()
  id: number
}
