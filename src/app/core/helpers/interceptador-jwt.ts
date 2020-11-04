import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AutenticacaoService } from '../service/autenticacao.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../service/snackbar.service';

@Injectable()
export class InterceptadorJwt implements HttpInterceptor {
  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !this.autenticacaoService.possuiUsuarioLogado &&
      !request.url.includes('/autenticacao')
    ) {
      this.router.navigate(['/login']);

      this.snackbarService.exibir('Refaça login para continuar');

      return of(null);
    }

    let usuarioAtual = this.autenticacaoService.usuarioAtualDTO;

    if (usuarioAtual?.token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${usuarioAtual.token}` },
      });
    }

    return next.handle(request);
  }
}
