import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PedidoFacadeApi } from './apis/pedido.facade.api';
import { PedidoDTO } from 'src/app/models/pedido.dto';

@Injectable({ providedIn: 'root' })
export class PedidoFacade {
  constructor(private api: PedidoFacadeApi) {}

  adquirirNaoFinalizados(): Observable<Array<PedidoDTO>> {
    return this.api.adquirirNaoFinalizados();
  }

  prosseguir(codigoPedido: number): Observable<void> {
    return this.api.prosseguir(codigoPedido);
  }

  recusar(codigoPedido: number): Observable<void> {
    return this.api.recusar(codigoPedido);
  }

}
