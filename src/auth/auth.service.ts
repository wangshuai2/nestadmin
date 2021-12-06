import {
  BadRequestException,
  CACHE_MANAGER,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserModel } from 'src/entitries/user.entity'
import { Repository } from 'typeorm'
import { SignInDTO, SignUpDTO } from './auth.dto'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from 'src/common/config/config.default'
import { Cache } from 'cache-manager'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  private async findOne(username: string): Promise<UserModel> {
    return await this.userRepository.findOne({ name: username })
  }

  async signinUser({ username, password }: SignInDTO): Promise<any> {
    const user = await this.findOne(username)
    console.log(user)
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        console.log('验证成功！')
        const token = this.generateJwt(user)
        delete user.password

        const cacheval = await this.cacheManager.set(
          `user:data:${username}`,
          JSON.stringify(user),
          {
            ttl: 0
          }
        )
        console.log(cacheval)

        return {
          code: HttpStatus.OK,
          message: 'success',
          data: {
            user,
            token
          }
        }
      }
    } else {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '用户不存在'
      }
    }
  }

  async createUser(info: SignUpDTO): Promise<any> {
    const isUnique = await this.findOne(info.username)

    console.log(isUnique)

    if (isUnique) {
      throw new BadRequestException({
        code: HttpStatus.BAD_REQUEST,
        message: '用户名已存在'
      })
    }

    const nu = new UserModel()
    nu.name = info.username
    nu.nickname = info.nickname
    nu.password = this.bcryptPass(info.password)
    nu.description = info.description
    nu.gender = 0

    const userResult = await this.userRepository.save(nu)

    console.log(userResult)

    return userResult
  }

  private bcryptPass(pwd: string) {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(pwd, salt)
  }

  public generateJwt(user: UserModel) {
    return jwt.sign(
      {
        id: user.id,
        name: user.name
      },
      TOKEN_SECRET,
      {
        expiresIn: 1 * 24 * 60 * 60
      }
    )
  }
}
