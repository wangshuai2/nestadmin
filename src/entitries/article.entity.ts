import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { CommentModel } from './comment.entity'
import { StatusType } from './entity.interface'

@Entity('article')
export class ArticleModel extends BaseEntity {
  @Column({ nullable: false })
  title: string

  @Column({ nullable: false })
  content: string

  @Column({ nullable: true, default: 0 })
  like: number

  @Column({ nullable: true, default: 0 })
  comments_num: number

  @Column({ nullable: true, default: 0 })
  views: number

  // @OneToMany(type => CommentModel, comment => comment.article)
  // comments: CommentModel[]

  @Column({ enum: StatusType, default: StatusType.FALSE })
  status: StatusType
}
