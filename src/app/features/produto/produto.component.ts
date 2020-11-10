import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoriaFacade } from 'src/app/core/facades/categoria.facade';
import { ProdutoFacade } from 'src/app/core/facades/produto.facade';
import { CategoriaDTO } from 'src/app/models/categoria.dto';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent implements OnInit {
  categorias: Array<CategoriaDTO> = [];
  pageType = 'new';
  options: FormGroup;

  idControl = new FormControl();
  nomeControl = new FormControl();
  descricaoControl = new FormControl();
  valorControl = new FormControl(0, Validators.min(0.01));
  ativoControl = new FormControl(true);
  categoriaControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private produtoFacade: ProdutoFacade,
    private categoriaFacade: CategoriaFacade
  ) {
    this.options = formBuilder.group({
      id: this.idControl,
      nome: this.nomeControl,
      descricao: this.descricaoControl,
      valor: this.valorControl,
      ativo: this.ativoControl,
      categoria: this.categoriaControl,
    });
  }

  ngOnInit(): void {
    this.categoriaFacade
      .adquirirPorEstabelecimento()
      .subscribe((listaCategorias) => {
        this.categorias = listaCategorias;
      });
  }

  adicionar(): void {
    this.produtoFacade
      .adicionar(this.options.value)
      .subscribe(() => this.options.reset());
  }

  salvar(): void {}
}
