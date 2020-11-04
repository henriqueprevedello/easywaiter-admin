import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProdutoFacade } from 'src/app/core/facades/produto.facade';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent implements OnInit {
  pageType = 'new';
  produto = { nome: 'asd' };
  options: FormGroup;
  idControl = new FormControl();
  nomeControl = new FormControl();
  descricaoControl = new FormControl();
  valorControl = new FormControl(0);
  ativoControl = new FormControl(true);

  constructor(
    private formBuilder: FormBuilder,
    private produtoFacade: ProdutoFacade
  ) {
    this.options = formBuilder.group({
      id: this.idControl,
      nome: this.nomeControl,
      descricao: this.descricaoControl,
      valor: this.valorControl,
      ativo: this.ativoControl,
    });
  }

  ngOnInit(): void {}

  adicionar() {
    debugger;
    this.produtoFacade.adicionar(this.options.value).subscribe(() => this.options.reset());
  }

  salvar() {}

  editar(){}
}
