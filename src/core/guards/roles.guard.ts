import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ERole } from '../enums/role.enum';
import { IPayload } from '../interfaces/payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const authorization = request.get('Authorization');

    const token = authorization.replace('Bearer ', '');
    const userSession: IPayload = this.authService.decode(token) as IPayload;

    if (!requiredRoles.some((role) => role.includes(userSession.role))) {
        throw new UnauthorizedException("You don't have permission");
    }

    return true;
  }
}