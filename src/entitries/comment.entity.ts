import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ArticleModel } from './article.entity'
import { CommentUserModel } from './comment-user.entity'

@Entity('comments')
export class CommentModel extends BaseEntity {
  @Column()
  like: number

  @Column()
  content: string

  @Column()
  article_id: number

  @Column()
  comment_content: string

  @Column()
  level: number

  @Column()
  parent_id: number

  @OneToOne(type => CommentUserModel)
  @JoinColumn()
  public_author: CommentUserModel

  @ManyToOne(type => ArticleModel, author => author.comments)
  article: ArticleModel
}
