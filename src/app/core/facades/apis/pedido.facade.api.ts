import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';
import { PedidoDTO } from 'src/app/models/pedido.dto';

@Injectable({ providedIn: 'root' })
export class PedidoFacadeApi {
  constructor(private http: HttpClient) {}

  adquirirNaoFinalizados(): Observable<Array<PedidoDTO>> {
    return this.http.get<Array<PedidoDTO>>(
      EndpointsConstants.PEDIDO.ADQUIRIR_NAO_FINALIZADOS
    );
  }

  atualizarStatus(
    codigoPedido: number,
    codigoStatus: number
  ): Observable<void> {
    const params = new HttpParams()
      .set('codigoPedido', codigoPedido.toString())
      .set('codigoStatus', codigoStatus.toString());

    return this.http.post<void>(
      EndpointsConstants.PEDIDO.ATUALIZAR_STATUS,
      null,
      {
        params,
      }
    );
  }

  recusar(codigoPedido: number): Observable<void> {
    const params = new HttpParams().set(
      'codigoPedido',
      codigoPedido.toString()
    );

    return this.http.post<void>(EndpointsConstants.PEDIDO.RECUSAR, null, {
      params,
    });
  }
}
