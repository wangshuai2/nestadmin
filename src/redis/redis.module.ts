import { Global, Module } from '@nestjs/common'
import { RedisModule } from 'nestjs-redis'
import { CacheService } from './redis.providers'

@Global()
@Module({
  imports: [
    RedisModule.register({
      host: '120.53.107.237',
      port: 16379,
      password: 'midwayRedis!',
      db: 13,
      keyPrefix: 'snd'
    })
  ],
  providers: [CacheService]
})
export class MRedisModule {}
