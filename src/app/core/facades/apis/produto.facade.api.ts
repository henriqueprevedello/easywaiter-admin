import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';
import { ProdutoDTO } from 'src/app/models/produto.dto';
import { CategoriaDTO } from 'src/app/models/categoria.dto';

@Injectable({ providedIn: 'root' })
export class ProdutoFacadeApi {
  constructor(private http: HttpClient) {}

  cadastrar(produtoDTO: ProdutoDTO): Observable<void> {
    return this.http.post<void>(
      EndpointsConstants.PRODUTO.CADASTRAR,
      produtoDTO
    );
  }

  adquirir(codigoProduto: string): Observable<ProdutoDTO> {
    const params = new HttpParams().set('codigoProduto', codigoProduto);

    return this.http.get<ProdutoDTO>(EndpointsConstants.PRODUTO.ADQUIRIR, {
      params,
    });
  }

  adquirirTodos(): Observable<Array<ProdutoDTO>> {
    return this.http.get<Array<ProdutoDTO>>(
      EndpointsConstants.PRODUTO.ADQUIRIR_TODOS
    );
  }

  editar(produtoDTO: ProdutoDTO): Observable<void> {

    return this.http.put<void>(EndpointsConstants.PRODUTO.EDITAR, produtoDTO);
  }

  excluir(codigoProduto: number): Observable<void> {
    const params = new HttpParams().set(
      'codigoProduto',
      codigoProduto.toString()
    );

    return this.http.delete<void>(EndpointsConstants.PRODUTO.EXCLUIR, {params});
  }
}
