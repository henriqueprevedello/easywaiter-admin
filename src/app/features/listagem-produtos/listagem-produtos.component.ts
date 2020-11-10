import { Component, OnInit } from '@angular/core';
import { ProdutoFacade } from 'src/app/core/facades/produto.facade';
import { ProdutoDTO } from 'src/app/models/produto.dto';

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.scss'],
})
export class ListagemProdutosComponent implements OnInit {
  produtos: Array<ProdutoDTO>;
  displayedColumns: string[] = [
    'id',
    'nome',
    'descricao',
    'valor',
    'categoria',
    'ativo',
  ];

  constructor(private produtoFacade: ProdutoFacade) {}

  ngOnInit(): void {
    this.produtoFacade
      .adquirir()
      .subscribe((listaProdutos) => (this.produtos = listaProdutos));
  }

  adquirirCor(ativo: boolean) {
    return ativo ? 'background-color: green;' : 'background-color: red;';
  }
}
