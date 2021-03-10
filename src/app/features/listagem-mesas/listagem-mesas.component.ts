import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MesaFacade } from 'src/app/core/facades/mesa.facade';
import { MesaDTO } from 'src/app/models/mesa.dto';

@Component({
  selector: 'app-listagem-mesas',
  templateUrl: './listagem-mesas.component.html',
  styleUrls: ['./listagem-mesas.component.scss'],
})
export class ListagemMesasComponent implements OnInit {
  displayedColumns: string[] = ['numero'];
  dataSource: MatTableDataSource<MesaDTO>;

  constructor(private mesaFacade: MesaFacade) {}

  ngOnInit(): void {
    this.mesaFacade
      .adquirirPorEstabelecimento()
      .subscribe(
        (listaMesas) => (this.dataSource = new MatTableDataSource(listaMesas))
      );
  }

  aplicarFiltro(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
