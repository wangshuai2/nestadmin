import { Body, Controller, Get, Post } from '@nestjs/common'
import { SignInDTO } from './auth.dto'

@Controller('auth')
export class AuthController {
  @Post('/signin')
  async signIn(@Body() data: SignInDTO) {
    return { code: 200, message: 'success' }
  }
  @Get('/test')
  async test() {
    return {
      abc: 123
    }
  }
}
