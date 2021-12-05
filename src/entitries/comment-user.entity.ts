import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'
import { StatusType } from './entity.interface'

@Entity('comment_user')
export class CommentUserModel extends BaseEntity {
  @Column()
  username: string

  @Column()
  phone: string

  @Column()
  mail: string

  @Column({ default: StatusType.FALSE, enum: StatusType })
  status: StatusType
}
