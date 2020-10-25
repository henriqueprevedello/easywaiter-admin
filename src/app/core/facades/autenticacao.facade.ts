import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AutenticacaoFacadeApi } from './apis/autenticacao.facade.api';
import { AutenticacaoDTO } from 'src/app/models/autenticacao.dto';

@Injectable({ providedIn: 'root' })
export class AutenticacaoFacade {
  constructor(private api: AutenticacaoFacadeApi) {}

  login(autenticacaoDTO: AutenticacaoDTO): Observable<String> {
    return this.api.login(autenticacaoDTO);
  }
}
