import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';
import { CategoriaDTO } from 'src/app/models/categoria.dto';

@Injectable({ providedIn: 'root' })
export class CategoriaFacadeApi {
  constructor(private http: HttpClient) {}

  cadastrar(categoriaDTO: CategoriaDTO): Observable<void> {
    return this.http.post<void>(EndpointsConstants.CATEGORIA.CADASTRAR, categoriaDTO);
  }

  adquirirPorEstabelecimento(): Observable<Array<CategoriaDTO>> {
    return this.http.get<Array<CategoriaDTO>>(
      EndpointsConstants.CATEGORIA.ADQUIRIR_POR_ESTABELECIMENTO
    );
  }

  editar(categoriaDTO: CategoriaDTO): Observable<void> {
    return this.http.post<void>(EndpointsConstants.CATEGORIA.EDITAR, categoriaDTO);
  }
}
