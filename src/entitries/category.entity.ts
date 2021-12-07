import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'
import { StatusType } from './entity.interface'

@Entity('category')
export class CategoryModel extends BaseEntity {
  @Column({ nullable: false })
  category_title: string

  @Column({ nullable: true })
  alias_name: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: false, default: 0 })
  level: number

  @Column({ nullable: true })
  parent_id: number

  @Column({ nullable: false, enum: StatusType, default: StatusType.FALSE })
  status: StatusType
}
