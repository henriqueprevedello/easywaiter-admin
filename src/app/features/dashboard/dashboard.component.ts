import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { ComandaFacade } from 'src/app/core/facades/comanda.facade';
import { PedidoFacade } from 'src/app/core/facades/pedido.facade';
import { StatusPedidoService } from 'src/app/core/service/status-pedido.service';
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
  statusSelecionadoExpandido = StatusPedidoEnum.REALIZADO;

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

  constructor(
    private pedidoFacade: PedidoFacade,
    private statusPedidoService: StatusPedidoService,
    protected comandaFacade: ComandaFacade
  ) {
    this.alimentarPedidos()
      .pipe(
        switchMap(() => comandaFacade.adquirirTodas()),
        tap((comandasAbertas) => (this.comandas = comandasAbertas)),
        take(1)
      )
      .subscribe();
  }

  ngOnInit() {}

  private alimentarPedidos(): Observable<Array<PedidoDTO>> {
    return this.pedidoFacade.adquirirNaoFinalizados().pipe(
      tap((listaPedidos) => (this.dataSource = listaPedidos)),
      catchError(() => (this.dataSource = []))
    );
  }

  adquirirCorIcone(valorBase: number, valorAtual: number): string {
    if (valorAtual > valorBase * 3) {
      return 'red';
    } else if (valorAtual > valorBase * 2) {
      return 'orange';
    } else if (valorAtual > valorBase) {
      return 'lightskyblue';
    }

    return valorAtual == 0 ? 'lightgrey' : 'lawngreen';
  }

  exibirStatus = (codigoStatus: number) =>
    this.statusPedidoService.exibirStatus(codigoStatus);

  adquirirStatusDisponiveisParaPedido = (codigoStatus: number) =>
    this.statusPedidoService.adquirirStatusDisponiveisParaPedido(codigoStatus);

  adquirirDescricaoItem = (pedidoItem: PedidoItemDTO): string =>
    `${pedidoItem.quantidade}x ${pedidoItem.produto.nome}`;

  get aguardandoConfirmacao(): number {
    return this.dataSource.filter(
      (pedido) => pedido.codigoStatus === StatusPedidoEnum.REALIZADO
    ).length;
  }

  get comandasAguardandoConfirmacao(): number {
    return this.comandas.filter(
      (comanda) => comanda.dataFechamento && !comanda.dataPagamento
    ).length;
  }

  get pedidosEmAndamento(): number {
    return this.dataSource.length;
  }

  atualizarStatusPedido(): void {
    this.dataSource = [];

    this.pedidoFacade
      .atualizarStatus(this.pedidoExpandido.id, this.statusSelecionadoExpandido)
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

  get botaoRecusarDesativado(): boolean {
    return (
      this.botoesDesativados ||
      this.pedidoExpandido.codigoStatus !== StatusPedidoEnum.REALIZADO
    );
  }

  onExpandPedido(pedido: PedidoDTO) {
    this.pedidoExpandido = this.pedidoExpandido === pedido ? null : pedido;

    if(![StatusPedidoEnum.RECUSADO, StatusPedidoEnum.CANCELADO].includes(pedido.codigoStatus)){
      this.statusSelecionadoExpandido = pedido.codigoStatus + 1;

      return;
    }

    this.statusSelecionadoExpandido = pedido.codigoStatus;
  }
}
