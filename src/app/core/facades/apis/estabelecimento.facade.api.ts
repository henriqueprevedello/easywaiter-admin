import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';
import { EstabelecimentoDTO } from 'src/app/models/estabelecimento.dto';

@Injectable({ providedIn: 'root' })
export class EstabelecimentoFacadeApi {
  constructor(private http: HttpClient) {}

  editar(
    estabelecimentoDTO: EstabelecimentoDTO
  ): Observable<EstabelecimentoDTO> {
    return this.http.post<EstabelecimentoDTO>(
      EndpointsConstants.ESTABELECIMENTO.EDITAR,
      estabelecimentoDTO
    );
  }

  adquirirLogado(): Observable<EstabelecimentoDTO> {
    return this.http.get<EstabelecimentoDTO>(
      EndpointsConstants.ESTABELECIMENTO.ADQUIRIR
    );
  }
}
