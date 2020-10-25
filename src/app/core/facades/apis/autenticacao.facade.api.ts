import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutenticacaoDTO } from 'src/app/models/autenticacao.dto';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';

@Injectable({ providedIn: 'root' })
export class AutenticacaoFacadeApi {
  constructor(private http: HttpClient) {}

  login(autenticacaoDTO: AutenticacaoDTO): Observable<String> {
    return this.http.post<String>(
      EndpointsConstants.AUTENTICACAO.LOGIN,
      autenticacaoDTO
    );
  }
}
