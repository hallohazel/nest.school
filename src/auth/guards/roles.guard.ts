import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Cek stiker role apa yang ada di pintu controller
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 2. Kalau pintu tidak ada stikernya, berarti bebas masuk
    if (!requiredRoles) {
      return true;
    }

    // 3. Ambil data user dari request (Use Generic <...> biar aman & rapi)
    const { user } = context
      .switchToHttp()
      .getRequest<{ user: { role: UserRole } }>();

    // 4. Apakah role user ada di daftar yang dibolehkan
    return requiredRoles.some((role) => user.role === role);
  }
}
