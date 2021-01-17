import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';
import { PedidoExporDTO } from 'src/app/models/pedido-expor.dto';

@Injectable({ providedIn: 'root' })
export class PedidoFacadeApi {
  constructor(private http: HttpClient) {}

  adquirirNaoFinalizados(): Observable<Array<PedidoExporDTO>> {
    return this.http.get<Array<PedidoExporDTO>>(
      EndpointsConstants.PEDIDO.ADQUIRIR_NAO_FINALIZADOS
    );
  }
}
