import { Body, Controller, Get, Post } from '@nestjs/common'
import { SignInDTO, SignUpDTO } from './auth.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() data: SignInDTO) {
    return await this.userService.signinUser(data)
  }

  @Post('/signup')
  async signUp(@Body() data: SignUpDTO) {
    return await this.userService.createUser(data)
  }

  @Get('/test')
  async test() {
    return {
      abc: 123
    }
  }
}
