import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Router,
} from '@angular/router';
import { AppService } from '../services/app.service';
import { Observable, map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Routes } from '../shared/enums/routes.enum';

const checkAuthStatus = (InLogin: boolean): boolean | Observable<boolean> => {
  const appService: AppService = inject(AppService);
  const router: Router = inject(Router);

  return appService.validateAuth().pipe(
    tap((isAuthenticated) => {
      isAuthenticated
        ? (InLogin && router.navigate([Routes.MAIN]), appService.getUser())
        : !InLogin && router.navigate([Routes.LOGIN]);
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
        router.navigate([Routes.LOGIN]);
      }
    })
  );
};
