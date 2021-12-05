import { Global, Module } from '@nestjs/common'
import { dbProvider } from './db.providers'

@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider]
})
export class DBModule {}
