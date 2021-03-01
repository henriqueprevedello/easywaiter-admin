import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProdutoFacadeApi } from './apis/produto.facade.api';
import { ProdutoDTO } from 'src/app/models/produto.dto';

@Injectable({ providedIn: 'root' })
export class ProdutoFacade {
  constructor(private api: ProdutoFacadeApi) {}

  cadastrar(produtoDTO: ProdutoDTO): Observable<void> {
    return this.api.cadastrar(produtoDTO);
  }

  adquirirTodos(): Observable<Array<ProdutoDTO>> {
    return this.api.adquirirTodos();
  }

  adquirir(codigoProduto: string): Observable<ProdutoDTO> {
    return this.api.adquirir(codigoProduto);
  }

  editar(produtoDTO: ProdutoDTO): Observable<void> {
    return this.api.editar(produtoDTO);
  }

  excluir(codigoProduto: number): Observable<void> {
    return this.api.excluir(codigoProduto);
  }
}
