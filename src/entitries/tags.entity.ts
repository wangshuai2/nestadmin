import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'
import { StatusType } from './entity.interface'

@Entity('tags')
export class TagsModel extends BaseEntity {
  @Column({ nullable: false, unique: true })
  tag_name: string

  @Column({ nullable: true })
  alias_name: string

  @Column({ nullable: true })
  description: string

  @Column({ enum: StatusType, default: StatusType.FALSE })
  status: StatusType
}
