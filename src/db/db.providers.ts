import { UserModel } from 'src/entitries/user.entity'
import { createConnection } from 'typeorm'

export const dbProvider = {
  provide: 'DbConnectionToken',
  useFactory: async () =>
    await createConnection({
      type: 'postgres',
      host: '120.53.107.237',
      port: 15432,
      username: 'postgres',
      password: 'pgMidwaY!',
      database: 'nest_test',
      synchronize: true,
      logging: true,
      entities: [UserModel]
    })
}
