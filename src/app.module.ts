import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { DBModule } from './db/db.module'

@Module({
  imports: [AuthModule, DBModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
