import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { ComandaFacade } from 'src/app/core/facades/comanda.facade';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { ComandaDTO } from 'src/app/models/comanda.dto';
import { PedidoItemDTO } from 'src/app/models/pedido-item.dto';
import { PedidoDTO } from 'src/app/models/pedido.dto';
import { RotasConstant } from 'src/app/shared/constants/rotas.constant';
import { StatusPedidoEnum } from 'src/app/shared/enums/status-pedido.enum';

@Component({
  selector: 'app-detalhar-comanda',
  templateUrl: './detalhar-comanda.component.html',
  styleUrls: ['./detalhar-comanda.component.scss'],
})
export class DetalharComandaComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private comandaFacade: ComandaFacade,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  comanda: ComandaDTO;
  dataSource: MatTableDataSource<PedidoDTO>;
  pedidoExpandido: PedidoDTO;

  columnsToDisplay = ['id', 'codigoStatus', 'dataCadastro'];

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => {
          if (params && params.get('id')) {
            return params.get('id');
          }

          return null;
        }),
        switchMap((codigoComanda) =>
          this.comandaFacade.adquirir(codigoComanda)
        ),
        tap((comanda) => {
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

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  confirmarPagamento() {
    this.comandaFacade
      .confirmarPagamento(this.comanda.id.toString())
      .pipe(
        take(1),
        catchError((error) => {
          this.snackbarService.exibir(error);
          
          return throwError(error);
        }),
        finalize(() => this.router.navigate([RotasConstant.COMANDAS]))
      )
      .subscribe();
  }

  get pedidosNaoFinalizados(): number {
    return this.comanda.pedidos.filter(
      (pedido) =>
        pedido.codigoStatus !== StatusPedidoEnum.CANCELADO &&
        pedido.codigoStatus !== StatusPedidoEnum.RECUSADO &&
        pedido.codigoStatus !== StatusPedidoEnum.ENTREGUE
    ).length;
  }

  adquirirTodosProdutosDistintos(): Array<PedidoItemDTO> {
    let listaTodosPedidoItens: Array<PedidoItemDTO> = [];
    this.comanda.pedidos.forEach((pedido) =>
      pedido.pedidoItens.forEach((pedidoItem) => {
        listaTodosPedidoItens.push(pedidoItem);
      })
    );

    return listaTodosPedidoItens;
  }
}
