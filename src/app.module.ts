import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { RedisModule } from 'nestjs-redis'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { MRedisModule } from './redis/redis.module'

@Module({
  imports: [
    // RedisModule.register({
    //   host: '120.53.107.237',
    //   port: 16379,
    //   password: 'midwayRedis!',
    //   db: 13,
    //   keyPrefix: 'snd'
    // }),
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
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
