import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';
import { AutenticacaoDTO } from 'src/app/models/autenticacao.dto';
import { AutenticacaoFacadeApi } from '../facades/apis/autenticacao.facade.api';
import { AutenticacaoFacade } from '../facades/autenticacao.facade';

@Injectable({ providedIn: 'root' })
export class AutenticacaoService {
  private currentTokenSubject: BehaviorSubject<String>;
  public currentToken: Observable<String>;

  constructor(private http: HttpClient, private autenticacaoFacade: AutenticacaoFacade) {

    this.currentTokenSubject = new BehaviorSubject<String>(
      JSON.parse(localStorage.getItem('currentToken'))
    );

    this.currentToken = this.currentTokenSubject.asObservable();

  }

  public get currentTokenValue(): String {
    return this.currentTokenSubject.value;
  }

  login(autenticacaoDTO: AutenticacaoDTO) {
    return this.autenticacaoFacade.login(autenticacaoDTO)
      .pipe(
        map((user: String) => {
          localStorage.setItem('currentToken', JSON.stringify(user));
           this.currentTokenSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentToken');
    this.currentTokenSubject.next(null);
  }
}
