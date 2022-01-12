import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const whiteList = ['/auth/signin', '/auth/signup', '/auth/test']
    if (whiteList.includes(req.url)) {
      return true
    } else {
      console.log(req.headers)
      if (req.headers && req.headers.authorization) {
        return true
      } else {
        return false
      }
    }
  }
}
