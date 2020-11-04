import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProdutoFacadeApi } from './apis/produto.facade.api';
import { ProdutoDTO } from 'src/app/models/produto.dto';

@Injectable({ providedIn: 'root' })
export class ProdutoFacade {
  constructor(private api: ProdutoFacadeApi) {}

  adicionar(produtoDTO: ProdutoDTO): Observable<void> {
    return this.api.adicionar(produtoDTO);
  }

  adquirir(): Observable<Array<ProdutoDTO>> {
    return this.api.adquirir();
  }

}
