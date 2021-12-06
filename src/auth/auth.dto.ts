import { IsNotEmpty, IsString } from "class-validator"

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsString()
  password: string
}
