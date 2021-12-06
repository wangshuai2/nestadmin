import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { GenderRole } from 'src/entitries/entity.interface'

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsString()
  password: string
}

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsString()
  nickname: string

  @IsString()
  description: string

  @IsEnum(GenderRole)
  gender: GenderRole
}
