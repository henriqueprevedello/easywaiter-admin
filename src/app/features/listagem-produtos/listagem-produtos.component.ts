import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { ProdutoFacade } from 'src/app/core/facades/produto.facade';
import { ProdutoDTO } from 'src/app/models/produto.dto';

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.scss'],
})
export class ListagemProdutosComponent implements OnInit {
  selection = new SelectionModel<ProdutoDTO>(true, []);
  dataSource: MatTableDataSource<ProdutoDTO>;
  displayedColumns: string[] = [
    'ativo',
    'nome',
    'categoria',
    'descricao',
    'valor',
  ];

  constructor(private produtoFacade: ProdutoFacade) {}

  ngOnInit(): void {
    this.produtoFacade
      .adquirirTodos()
      .pipe(take(1))
      .subscribe((listaProdutos) => {
        this.dataSource = new MatTableDataSource(listaProdutos);

        this.dataSource.data.forEach((p) => {
          if (p.ativo) {
            this.selection.toggle(p);
          }
        });
      });
  }

  adquirirCor(ativo: boolean) {
    return ativo ? 'background-color: green;' : 'background-color: red;';
  }

  private todosSelecionados() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: ProdutoDTO): string {
    if (!row) {
      return `${this.todosSelecionados() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
