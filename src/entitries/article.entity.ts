import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { CommentModel } from './comment.entity'
import { StatusType } from './entity.interface'
import { TagsModel } from './tags.entity'

@Entity('article')
export class ArticleModel extends BaseEntity {
  @Column({ nullable: false })
  title: string

  @Column({ nullable: false })
  content: string

  @Column({ nullable: true, default: '' })
  description: string

  @Column({ nullable: true, default: '' })
  url: string

  @Column({ nullable: true, default: 0 })
  like: number

  @Column({ nullable: true, default: 0 })
  views: number

  @Column({ nullable: true, default: 0, name: 'comments_num' })
  commentsNum: number

  @Column({ enum: StatusType, default: StatusType.FALSE })
  status: StatusType

  @Column({ nullable: true, default: null, name: 'category_id', type: 'int' })
  categoryId: number

  @Column({ nullable: true, default: 1, name: 'is_droped', type: 'int' })
  isDroped: number

  // @OneToMany(type => CommentModel, comment => comment.article)
  // comments: CommentModel[]

  // @OneToMany(type => TagsModel, tags => tags.article)
  // tags: TagsModel[]

  // static findByArticleId(articleId: number) {
  //   return this.createQueryBuilder('ArticleModel')
  //     .leftJoinAndSelect('ArticleModel.tags', 'TagsModel')
  //     .where('ArticleModel.id=:articleId', { articleId })
  //     .getMany()
  // }
}
