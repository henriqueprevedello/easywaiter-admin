import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class InterceptadorRequisicao implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.setHeaders(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error) {
          console.error(`Uma exceção ocorreu: ${error.error}`);

          return throwError(error.error);
        }

        return throwError({
          codigo:
            error.error && error.error.message === 'Read timed out'
              ? 'TIMEOUT'
              : 'FALHA_COMUNICACAO',
          mensagem:
            'Desculpe, uma falha de comunicação inesperada aconteceu, tente novamente',
        });
      })
    );
  }

  private setHeaders(req: HttpRequest<any>): HttpRequest<any> {

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }
    if (!req.headers.has('Access-Control-Allow-Credentials')) {
      req = req.clone({
        headers: req.headers.set('Access-Control-Allow-Credentials', 'true'),
      });
    }
    if (!req.headers.has('Access-Control-Allow-Origin')) {
      req = req.clone({
        headers: req.headers.set('Access-Control-Allow-Origin', '*'),
      });
    }
    if (!req.headers.has('Access-Control-Allow-Methods')) {
      req = req.clone({
        headers: req.headers.set(
          'Access-Control-Allow-Methods',
          'POST, PUT, GET, OPTIONS, DELETE'
        ),
      });
    }
    if (!req.headers.has('Access-Control-Max-Age')) {
      req = req.clone({
        headers: req.headers.set('Access-Control-Max-Age', '3600'),
      });
    }
    if (!req.headers.has('Access-Control-Allow-Headers')) {
      req = req.clone({
        headers: req.headers.set(
          'Access-Control-Allow-Headers',
          'x-requested-with'
        ),
      });
    }

    return req;
  }
}
