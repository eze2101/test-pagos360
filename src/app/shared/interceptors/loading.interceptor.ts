import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingStoreService } from 'src/app/signals/signals.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  loadingService = inject(LoadingStoreService);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.setStateBoolean(true);
    return next
      .handle(req)
      .pipe(finalize(() => this.loadingService.setStateBoolean(false)));
  }
}
