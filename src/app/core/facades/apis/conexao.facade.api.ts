import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';
import { MesaDTO } from 'src/app/models/mesa.dto';

@Injectable({ providedIn: 'root' })
export class ConexaoFacadeApi {
  constructor(private http: HttpClient) {}

  testar(): Observable<void> {
    return this.http.get<void>(EndpointsConstants.CONEXAO.TESTAR);
  }

  
}
