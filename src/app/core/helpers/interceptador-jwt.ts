import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../service/autenticacao.service';

@Injectable()
export class InterceptadorJwt implements HttpInterceptor {
    constructor(private autenticacaoService: AutenticacaoService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        let currentToken = this.autenticacaoService.currentTokenValue;

        if (currentToken) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${currentToken}` } });
        }

        return next.handle(request);
    }
}