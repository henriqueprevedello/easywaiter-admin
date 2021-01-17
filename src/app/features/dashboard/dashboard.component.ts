import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { PedidoFacade } from 'src/app/core/facades/pedido.facade';
import { PedidoExporDTO } from 'src/app/models/pedido-expor.dto';
import { PedidoDTO } from 'src/app/models/pedido.dto';
import { StatusPedidoEnum } from 'src/app/shared/enums/status-pedido.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataSource: Array<PedidoExporDTO>;
  columnsToDisplay = [
    'id',
    'codigoStatus',
    'mesaDTO',
    'nomeCliente',
    'dataCadastro',
  ];
  pedidoExpandido: PedidoDTO | null;

  constructor(pedidoFacade: PedidoFacade) {
    pedidoFacade
      .adquirirNaoFinalizados()
      .pipe(take(1))
      .subscribe((listaPedidos) => {
        debugger;
        this.dataSource = listaPedidos;
      });
  }

  ngOnInit() {}

  adquirirCorIcone(valorBase: number, valorAtual: number): string {
    if (valorAtual > valorBase * 3) {
      return 'red';
    } else if (valorAtual > valorBase * 2) {
      return 'orange';
    } else if (valorAtual > valorBase) {
      return 'yellow';
    }

    return 'lightskyblue';
  }

  exibirStatus(codigoStatus: number): string {
    
    switch (codigoStatus) {
      case StatusPedidoEnum.INICIADO:
        return 'Iniciado';

      case StatusPedidoEnum.EM_PREPARO:
        return 'Em preparo';

      case StatusPedidoEnum.ENTREGUE:
        return 'Entregue';

      case StatusPedidoEnum.CANCELADO:
        return 'Cancelado';

      case StatusPedidoEnum.RECUSADO:
        return 'Recusado';

      default:
        return 'Desconhecido';
    }
  }
}
