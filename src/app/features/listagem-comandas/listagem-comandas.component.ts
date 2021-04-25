import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, take, tap } from 'rxjs/operators';
import { ComandaFacade } from 'src/app/core/facades/comanda.facade';
import { ObjectHelper } from 'src/app/core/helpers/object.helper';
import { ComandaDTO } from 'src/app/models/comanda.dto';

@Component({
  selector: 'app-listagem-comandas',
  templateUrl: './listagem-comandas.component.html',
  styleUrls: ['./listagem-comandas.component.scss'],
})
export class ListagemComandasComponent implements OnInit, OnDestroy {
  private intervalComandas;
  comandas = new MatTableDataSource<ComandaDTO>([]);

  displayedColumns: string[] = [
    'id',
    'dataFechamento',
    'mesa',
    'nomeCliente',
    'numeroPedidos',
    'dataAbertura',
  ];

  constructor(private comandaFacade: ComandaFacade) {}

  ngOnInit(): void {
    this.adquirirTodas();

    this.intervalComandas = setInterval(this.atualizarComandas, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalComandas);
  }

  private atualizarComandas = async () => this.adquirirTodas();

  private adquirirTodas() {
    this.comandaFacade
      .adquirirTodas()
      .pipe(
        map((comandas) => comandas.sort((a, b) => a.id - b.id).reverse()),
        tap((comandasAbertas) => {
          if (!ObjectHelper.iguais(this.comandas.data, comandasAbertas)) {
            this.comandas = new MatTableDataSource(comandasAbertas);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.comandas.filter = filterValue.trim().toLowerCase();

    if (this.comandas.paginator) {
      this.comandas.paginator.firstPage();
    }
  }

  status(comanda: ComandaDTO) {
    if (comanda.dataPagamento) {
      return 'Fechada';
    } else if (comanda.dataFechamento) {
      return 'Em confirmação';
    }

    return 'Aberta';
  }
}
