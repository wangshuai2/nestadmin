import { CacheModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
// import type { ClientOpts as RedisClientOpts } from 'redis'
import * as redisStore from 'cache-manager-redis-store'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TagModule } from './tag/tag.module'

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      isGlobal: true,
      host: '120.53.107.237',
      port: 16379,
      auth_pass: 'midwayRedis!',
      db: 0,
      ttl: 600
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '120.53.107.237',
      port: 15432,
      username: 'postgres',
      password: 'pgMidwaY!',
      database: 'nest_test',
      synchronize: true,
      logging: true,
      entities: ['dist/**/*.entity.js']
    }),
    AuthModule,
    TagModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
