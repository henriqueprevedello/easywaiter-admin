import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { ComandaFacade } from 'src/app/core/facades/comanda.facade';
import { ComandaDTO } from 'src/app/models/comanda.dto';
import { PedidoItemDTO } from 'src/app/models/pedido-item.dto';
import { PedidoDTO } from 'src/app/models/pedido.dto';
import { StatusPedidoEnum } from 'src/app/shared/enums/status-pedido.enum';

@Component({
  selector: 'app-detalhar-comanda',
  templateUrl: './detalhar-comanda.component.html',
  styleUrls: ['./detalhar-comanda.component.scss'],
})
export class DetalharComandaComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private comandaFacade: ComandaFacade
  ) {}

  comanda: ComandaDTO;
  dataSource: MatTableDataSource<PedidoDTO>;
  pedidoExpandido: PedidoDTO;

  columnsToDisplay = ['id', 'codigoStatus', 'dataCadastro'];

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => {
          debugger;
          if (params && params.get('id')) {
            return params.get('id');
          }

          return null;
        }),
        switchMap((codigoComanda) =>
          this.comandaFacade.adquirir(codigoComanda)
        ),
        tap((comanda) => {
          debugger;
          this.comanda = comanda;
          this.dataSource = new MatTableDataSource(comanda.pedidos);
        }),
        take(1)
      )
      .subscribe();
  }

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

  onExpandPedido(pedido: PedidoDTO) {
    this.pedidoExpandido = this.pedidoExpandido === pedido ? null : pedido;
  }

  adquirirDescricaoItem = (pedidoItem: PedidoItemDTO): string =>
    `${pedidoItem.quantidade}x ${pedidoItem.produto.nome}`;
}
