import { IsDefined, IsIn, IsNotEmpty, IsString } from 'class-validator'
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

  @IsString()
  aliasName: string

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
