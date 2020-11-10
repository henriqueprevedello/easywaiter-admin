import { Component, OnInit } from '@angular/core';
import { CategoriaFacade } from 'src/app/core/facades/categoria.facade';
import { CategoriaDTO } from 'src/app/models/categoria.dto';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.scss']
})
export class ListagemCategoriasComponent implements OnInit {
  categorias: Array<CategoriaDTO>;
  displayedColumns: string[] = ['nome'];

  constructor(private categoriaFacade: CategoriaFacade) {}

  ngOnInit(): void {
    this.categoriaFacade
      .adquirirPorEstabelecimento()
      .subscribe((listaCategorias) => (this.categorias = listaCategorias));
  }

  teste(){}
}
