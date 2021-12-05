import { UserModel } from 'src/entitries/user.entity'
import { createConnection } from 'typeorm'
import { TagsModel } from '../entitries/tags.entity'
import { CategoryModel } from '../entitries/category.entity'
import { ArticleModel } from '../entitries/article.entity'
import { CommentModel } from '../entitries/comment.entity'
import { CommentUserModel } from '../entitries/comment-user.entity'

export const dbProvider = {
  provide: 'DbConnectionToken',
  useFactory: async () =>
    await createConnection({
      type: 'postgres',
      host: '120.53.107.237',
      port: 15432,
      username: 'postgres',
      password: 'pgMidwaY!',
      // database: 'nest_test',
      database: 'midway_test',
      synchronize: true,
      logging: true,
      entities: [
        UserModel,
        TagsModel,
        CategoryModel,
        ArticleModel,
        CommentModel,
        CommentUserModel
      ]
    })
}
