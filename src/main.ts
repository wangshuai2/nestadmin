import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from './common/pipes/validate.pipe'
import { AuthGuard } from './common/guard/auth.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new AuthGuard())
  await app.listen(8910)
}
bootstrap()
