import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoriaFacadeApi } from './apis/categoria.facade.api';
import { CategoriaDTO } from 'src/app/models/categoria.dto';

@Injectable({ providedIn: 'root' })
export class CategoriaFacade {
  constructor(private api: CategoriaFacadeApi) {}

  cadastrar(categoriaDTO: CategoriaDTO): Observable<void> {
    return this.api.cadastrar(categoriaDTO);
  }

  adquirirPorEstabelecimento(): Observable<Array<CategoriaDTO>> {
    return this.api.adquirirPorEstabelecimento();
  }

  editar(categoriaDTO: CategoriaDTO): Observable<void> {
    return this.api.editar(categoriaDTO);
  }

  excluir(codigoCategoria: number): Observable<void> {
    return this.api.excluir(codigoCategoria);
  }
}
