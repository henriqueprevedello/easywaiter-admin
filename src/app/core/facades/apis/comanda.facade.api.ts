import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';
import { ProdutoDTO } from 'src/app/models/produto.dto';
import { ComandaDTO } from 'src/app/models/comanda.dto';

@Injectable({ providedIn: 'root' })
export class ComandaFacadeApi {
  constructor(private http: HttpClient) {}

  adquirirTodas(): Observable<Array<ComandaDTO>> {
    return this.http.get<Array<ComandaDTO>>(
      EndpointsConstants.COMANDA.ADQUIRIR_TODAS
    );
  }
}
