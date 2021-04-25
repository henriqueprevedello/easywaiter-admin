import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, take } from 'rxjs/operators';
import { ComandaFacade } from 'src/app/core/facades/comanda.facade';
import { ComandaDTO } from 'src/app/models/comanda.dto';

@Component({
  selector: 'app-listagem-comandas',
  templateUrl: './listagem-comandas.component.html',
  styleUrls: ['./listagem-comandas.component.scss'],
})
export class ListagemComandasComponent implements OnInit {
  dataSource: MatTableDataSource<ComandaDTO>;

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
    this.comandaFacade
      .adquirirTodas()
      .pipe(
        map((comandas) => comandas.sort((a, b) => a.id - b.id).reverse()),
        take(1)
      )
      .subscribe(
        (todasComandas) =>
          (this.dataSource = new MatTableDataSource(todasComandas))
      );
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  status(comanda: ComandaDTO){
    if(comanda.dataPagamento){
      return 'Fechada';
    } else if(comanda.dataFechamento){
      return 'Em confirmação';
    } 

    return 'Aberta';
  }
}
