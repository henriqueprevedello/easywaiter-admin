import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { EstabelecimentoFacadeApi } from './apis/estabelecimento.facade.api';
import { EstabelecimentoDTO } from 'src/app/models/estabelecimento.dto';

@Injectable({ providedIn: 'root' })
export class EstabelecimentoFacade {
  constructor(private api: EstabelecimentoFacadeApi) {}

  editar(
    estabelecimentoDTO: EstabelecimentoDTO
  ): Observable<EstabelecimentoDTO> {
    return this.api.editar(estabelecimentoDTO);
  }

  adquirirLogado(): Observable<EstabelecimentoDTO> {
    return this.api.adquirirLogado();
  }
}
