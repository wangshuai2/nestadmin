import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'
import { StatusType } from './entity.interface'

@Entity('category')
export class CategoryModel extends BaseEntity {
  @Column()
  category_title: string

  @Column()
  alias_name: string

  @Column()
  description: string

  @Column()
  level: number

  @Column()
  parent_id: number

  @Column({ enum: StatusType, default: StatusType.FALSE })
  status: StatusType
}
