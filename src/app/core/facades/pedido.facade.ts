import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PedidoFacadeApi } from './apis/pedido.facade.api';
import { PedidoExporDTO } from 'src/app/models/pedido-expor.dto';

@Injectable({ providedIn: 'root' })
export class PedidoFacade {
  constructor(private api: PedidoFacadeApi) {}

  adquirirNaoFinalizados(): Observable<Array<PedidoExporDTO>> {
    return this.api.adquirirNaoFinalizados();
  }

  prosseguir(codigoPedido: number): Observable<void> {
    return this.api.prosseguir(codigoPedido);
  }

  recusar(codigoPedido: number): Observable<void> {
    return this.api.recusar(codigoPedido);
  }

}
