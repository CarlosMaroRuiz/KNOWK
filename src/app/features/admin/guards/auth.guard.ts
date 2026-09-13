import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';
import { APP_ROUTES } from '@core/routes/routes.config';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/', APP_ROUTES.ADMIN.path, APP_ROUTES.ADMIN_LOGIN.path]);
};
