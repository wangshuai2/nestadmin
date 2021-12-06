import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
  ValidationPipeOptions
} from '@nestjs/common'
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  protected validatorOptions: ValidatorOptions
  constructor(options?: ValidationPipeOptions) {
    this.validatorOptions = options
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('no data submitted')
    }

    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value, {
      // 排除不存在dto对象上的值
      // excludeExtraneousValues: true,
      // enableImplicitConversion: true
    })

    const errors = await validate(object, this.validatorOptions)
    if (errors.length > 0) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Input Data Validation Failed',
          errors: this.buildError(errors)
        },
        HttpStatus.BAD_REQUEST
      )
      // throw new BadRequestException('validation failed')
    }
    return value
  }

  private buildError(errors) {
    const result = {}
    errors.forEach(el => {
      const prop = el.property
      Object.entries(el.constraints).forEach(constraint => {
        result[prop + constraint[0]] = `${constraint[1]}`
      })
    })
    return result
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.find(type => metatype === type)
  }
}
