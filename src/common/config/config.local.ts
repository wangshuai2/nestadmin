import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, Max, Min, ValidateIf } from 'class-validator'

const emptyList = [null, undefined]
export default class LocalConfig {
  /**
   * 系统服务配置
   */
  @Expose()
  @ValidateIf(o => !emptyList.includes(o.SERVER_PORT))
  @Min(1)
  @Max(65535)
  @IsNumber()
  readonly SERVER_PORT: number

  @Expose()
  @ValidateIf(o => !emptyList.includes(o.PRO_DOC))
  readonly PRO_DOC: boolean

  @Expose()
  @IsNotEmpty()
  readonly WEB_OSS: boolean

  @Expose()
  @ValidateIf(o => !emptyList.includes(o.TOKEN_SECRET))
  @IsNotEmpty()
  readonly TOKEN_SECRET: string

  /**
   * 阿里云 oss
   */
  @Expose()
  @IsNotEmpty()
  readonly ALIYUN_OSS_ENDPOINT: string

  @Expose()
  @IsNotEmpty()
  readonly ALIYUN_OSS_BUCKET: string

  /**
   * 数据库
   */
  @Expose()
  @IsNotEmpty()
  readonly DB_HOST: string

  @Expose()
  @Min(1)
  @Max(65535)
  @IsNotEmpty()
  @IsNumber()
  readonly DB_PORT: number

  @Expose()
  @IsNotEmpty()
  readonly DB_USER: string

  @Expose()
  @IsNotEmpty()
  readonly DB_PASSWORD: string

  @Expose()
  @IsNotEmpty()
  readonly DB_DATABASE: string

  /**
   * Redis
   */
  @Expose()
  @IsNotEmpty()
  readonly REDIS_HOST: string

  @Expose()
  @Min(1)
  @Max(65535)
  @IsNotEmpty()
  @IsNumber()
  readonly REDIS_PORT: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  readonly REDIS_DB: number

  @Expose()
  @IsNotEmpty()
  readonly REDIS_PASSWORD: string

  @Expose()
  @ValidateIf(o => o.REDIS_PREFIX)
  @IsNotEmpty()
  readonly REDIS_PREFIX: string
}
