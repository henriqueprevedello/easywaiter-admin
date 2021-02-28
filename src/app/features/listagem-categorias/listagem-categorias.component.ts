import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaFacade } from 'src/app/core/facades/categoria.facade';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { MesaDTO } from 'src/app/models/mesa.dto';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.scss'],
})
export class ListagemCategoriasComponent implements OnInit {
  displayedColumns: string[] = ['nome'];
  dataSource: MatTableDataSource<CategoriaDTO>;

  constructor(private categoriaFacade: CategoriaFacade) {}

  ngOnInit(): void {
    this.categoriaFacade
      .adquirirPorEstabelecimento()
      .subscribe(
        (listaCategorias) =>
          (this.dataSource = new MatTableDataSource(listaCategorias))
      );
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
