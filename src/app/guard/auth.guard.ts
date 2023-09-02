import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Router,
} from '@angular/router';
import { AppService } from '../services/app.service';
import { Observable, map, tap } from 'rxjs';
import { inject } from '@angular/core';

const checkAuthStatus = (InLogin: boolean): boolean | Observable<boolean> => {
  const appService: AppService = inject(AppService);
  const router: Router = inject(Router);

  return appService.validateAuth().pipe(
    tap((isAuthenticated) => {
      isAuthenticated
        ? InLogin && router.navigate(['/main/cobranzas'])
        : !InLogin && router.navigate(['/auth/login']);
    }),
    map((isAuthenticated) => {
      return InLogin ? !isAuthenticated : isAuthenticated;
    })
  );
};

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  let InLogin: boolean = route.routeConfig?.path === 'auth';
  return checkAuthStatus(InLogin);
};

export const canMatchGuard: CanMatchFn = () => {
  const appService: AppService = inject(AppService);
  const router: Router = inject(Router);
  return appService.validateAuth().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
      }
    })
  );
};
