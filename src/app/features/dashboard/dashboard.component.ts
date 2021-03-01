import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { PedidoFacade } from 'src/app/core/facades/pedido.facade';
import { ComandaDTO } from 'src/app/models/comanda.dto';
import { PedidoItemDTO } from 'src/app/models/pedido-item.dto';
import { PedidoDTO } from 'src/app/models/pedido.dto';
import { StatusPedidoEnum } from 'src/app/shared/enums/status-pedido.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  descricaoBotaoProsseguir = 'Prosseguir';

  dataSource: Array<PedidoDTO> = [];
  comandas: Array<ComandaDTO> = [];
  columnsToDisplay = [
    'id',
    'codigoStatus',
    'mesaDTO',
    'nomeCliente',
    'dataCadastro',
  ];
  pedidoExpandido: PedidoDTO;

  botoesDesativados = false;

  constructor(private pedidoFacade: PedidoFacade, private router: Router) {
    this.alimentarPedidos().pipe(take(1)).subscribe();
  }

  ngOnInit() {}

  private alimentarPedidos(): Observable<Array<PedidoDTO>> {
    return this.pedidoFacade.adquirirNaoFinalizados().pipe(
      tap((listaPedidos) => (this.dataSource = listaPedidos)),
      catchError((excecao) => (this.dataSource = []))
    );
  }

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

  prosseguirPedido(): void {
    this.dataSource = [];

    this.pedidoExpandido;

    this.pedidoFacade
      .prosseguir(this.pedidoExpandido.id)
      .pipe(
        switchMap(() => this.alimentarPedidos()),
        take(1)
      )
      .subscribe();
  }

  recusarPedido(): void {
    this.pedidoFacade
      .recusar(this.pedidoExpandido.id)
      .pipe(
        switchMap(() => this.alimentarPedidos()),
        take(1)
      )
      .subscribe();
  }

  adquirirDescricaoItem = (pedidoItem: PedidoItemDTO): string =>
    `${pedidoItem.quantidade}x ${pedidoItem.produto.nome}`;

  get aguardandoConfirmacao(): number {
    return this.dataSource.filter(
      (pedido) => pedido.codigoStatus === StatusPedidoEnum.REALIZADO
    ).length;
  }

  get comandasAbertas(): number {
    return this.comandas.filter((comanda) => !comanda.dataFechamento).length;
  }

  get totalComandas(): number {
    return this.comandas.length;
  }

  get produtosVendidos(): number {
    return 0;
  }

  get botaoProsseguirDesativado(): boolean {
    return (
      this.botoesDesativados ||
      this.statusQueNaoPodemProsseguir.includes(
        this.pedidoExpandido.codigoStatus
      )
    );
  }

  private get statusQueNaoPodemProsseguir(): Array<number> {
    return [
      StatusPedidoEnum.CANCELADO,
      StatusPedidoEnum.ENTREGUE,
      StatusPedidoEnum.RECUSADO,
    ];
  }

  get botaoRecusarDesativado(): boolean {
    return (
      this.botoesDesativados ||
      this.pedidoExpandido.codigoStatus !== StatusPedidoEnum.REALIZADO
    );
  }

  onExpandPedido(pedido: PedidoDTO) {
    this.descricaoBotaoProsseguir = this.exibirProximoStatusProsseguir(
      pedido.codigoStatus
    );

    this.pedidoExpandido = this.pedidoExpandido === pedido ? null : pedido;
  }

  exibirProximoStatusProsseguir(codigoStatus: number): string {
    switch (codigoStatus) {
      case StatusPedidoEnum.REALIZADO:
        return 'CONFIRMAR';

      case StatusPedidoEnum.CONFIRMADO:
        return 'PREPARAR';

      case StatusPedidoEnum.EM_PREPARO:
        return 'ENTREGAR';

      case StatusPedidoEnum.EM_ENTREGA:
        return 'ENTREGUE';

      default:
        return 'PROSSEGUIR';
    }
  }
}
