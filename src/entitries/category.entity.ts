import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'
import { StatusType } from './entity.interface'

@Entity('category')
export class CategoryModel extends BaseEntity {
  @Column({ nullable: false, name: 'category_title' })
  categoryTitle: string

  @Column({ nullable: true, default: null, name: 'alias_name' })
  aliasName: string

  @Column({ nullable: true, default: null })
  description: string

  @Column({ nullable: false, default: 0 })
  level: number

  @Column({ nullable: true, default: 0, name: 'parent_id' })
  parentId: number

  @Column({
    nullable: false,
    type: 'enum',
    enum: StatusType,
    default: StatusType.FALSE
  })
  status: StatusType
}
