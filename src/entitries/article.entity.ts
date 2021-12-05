import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { CommentModel } from './comment.entity'
import { StatusType } from './entity.interface'

@Entity('article')
export class ArticleModel extends BaseEntity {
  @Column()
  title: string

  @Column()
  content: string

  @Column()
  like: number

  @Column()
  comments_num: number

  @Column()
  views: number

  @OneToMany(type => CommentModel, comment => comment.article)
  comments: CommentModel[]

  @Column({ enum: StatusType, default: StatusType.FALSE })
  status: StatusType
}
