import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AutenticacaoService } from '../service/autenticacao.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../service/snackbar.service';


@Injectable()
export class InterceptadorErro implements HttpInterceptor {
    constructor(private autenticacaoService: AutenticacaoService, private router: Router, private snackbar: SnackbarService ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err:HttpErrorResponse) => {
            debugger;
            if(err.status === 0){
                this.router.navigate(['/sem-conexao']);
            } else if (err.status === 401 || err.status === 403) {
                this.autenticacaoService.logout();
                location.reload(true);

                this.snackbar.exibir('Sessão expirou, por favor refaça o login!');
            } else if(err.status === 400 && err.url.includes('/autenticacao')){

                return throwError('Dados inválidos');
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}