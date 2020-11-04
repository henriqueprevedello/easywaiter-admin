import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';
import { ProdutoDTO } from 'src/app/models/produto.dto';

@Injectable({ providedIn: 'root' })
export class ProdutoFacadeApi {
  constructor(private http: HttpClient) {}

  adicionar(produtoDTO: ProdutoDTO): Observable<void> {
    return this.http.post<void>(
      EndpointsConstants.PRODUTO.ADICIONAR,
      produtoDTO
    );
  }

  adquirir(): Observable<Array<ProdutoDTO>> {
    return this.http.get<Array<ProdutoDTO>>(
      EndpointsConstants.PRODUTO.ADQUIRIR
    );
  }
}
