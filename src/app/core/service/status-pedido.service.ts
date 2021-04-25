import { Injectable } from '@angular/core';
import { StatusPedidoEnum } from 'src/app/shared/enums/status-pedido.enum';

@Injectable({
  providedIn: 'root',
})
export class StatusPedidoService {
  constructor() {}

  exibirStatus(codigoStatus: number): string {
    switch (codigoStatus) {
      case StatusPedidoEnum.CANCELADO:
        return 'Cancelado';

      case StatusPedidoEnum.CONFIRMADO:
        return 'Confirmado';

      case StatusPedidoEnum.EM_ENTREGA:
        return 'Em entrega';

      case StatusPedidoEnum.EM_PREPARO:
        return 'Em preparo';

      case StatusPedidoEnum.ENTREGUE:
        return 'Entregue';

      case StatusPedidoEnum.REALIZADO:
        return 'Realizado';

      case StatusPedidoEnum.RECUSADO:
        return 'Recusado';

      default:
        return 'Desconhecido';
    }
  }

  adquirirStatusDisponiveisParaPedido(codigoStatus: number): Array<number> {
    const status = [
      StatusPedidoEnum.CANCELADO,
      StatusPedidoEnum.RECUSADO,
      StatusPedidoEnum.REALIZADO,
      StatusPedidoEnum.CONFIRMADO,
      StatusPedidoEnum.EM_PREPARO,
      StatusPedidoEnum.EM_ENTREGA,
      StatusPedidoEnum.ENTREGUE,
    ];

    return status.filter((s) => s > codigoStatus);
  }

  pedidoEstaEmAndamento(codigoStatus: number){
    return codigoStatus !== StatusPedidoEnum.CANCELADO &&
    codigoStatus !== StatusPedidoEnum.RECUSADO &&
    codigoStatus !== StatusPedidoEnum.ENTREGUE
  }

  pedidoInvalido(codigoStatus: number){
    return codigoStatus === StatusPedidoEnum.CANCELADO ||
    codigoStatus === StatusPedidoEnum.RECUSADO;
  }
}
