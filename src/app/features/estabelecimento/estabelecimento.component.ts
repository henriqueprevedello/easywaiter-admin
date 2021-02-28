import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs/operators';
import { EstabelecimentoFacadeApi } from 'src/app/core/facades/apis/estabelecimento.facade.api';
import { EstabelecimentoFacade } from 'src/app/core/facades/estabelecimento.facade';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { EstabelecimentoDTO } from 'src/app/models/estabelecimento.dto';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styleUrls: ['./estabelecimento.component.scss'],
})
export class EstabelecimentoComponent implements OnInit {
  options: FormGroup;
  idControl = new FormControl();
  nomeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  descricaoControl = new FormControl();
  telefoneControl = new FormControl();
  cnpjControl = new FormControl({ value: '', disabled: true });
  estadoControl = new FormControl({ value: '', disabled: true });
  cidadeControl = new FormControl({ value: '', disabled: true });
  imagemControl = new FormControl({ value: '', disabled: true });

  constructor(
    private formBuilder: FormBuilder,
    private estabelecimentoFacade: EstabelecimentoFacade,
    private snackbarService: SnackbarService
  ) {
    this.options = formBuilder.group({
      codigoEstabelecimento: this.idControl,
      nome: this.nomeControl,
      descricao: this.descricaoControl,
      numeroTelefone: this.telefoneControl,
      cnpj: this.cnpjControl,
      estado: this.estadoControl,
      cidade: this.cidadeControl,
      imagem: this.imagemControl,
    });
  }

  ngOnInit(): void {
    this.estabelecimentoFacade
      .adquirirLogado()
      .pipe(take(1))
      .subscribe((estabelecimentoLogado) =>
        this.preencherFormulario(estabelecimentoLogado)
      );
  }

  editar(): void {
    
    this.estabelecimentoFacade
      .editar(this.options.value)
      .pipe(take(1))
      .subscribe((estabelecimentoDTO) => {
        this.options.reset();
        this.preencherFormulario(estabelecimentoDTO);
        this.snackbarService.exibir(
          'Informações do estabelecimento salvas com sucesso!'
        );
      });
  }

  preencherFormulario(estabelecimento: EstabelecimentoDTO): void {
    this.options
      .get('codigoEstabelecimento')
      .setValue(estabelecimento.codigoEstabelecimento);
    this.options.get('nome').setValue(estabelecimento.nome);
    this.options.get('descricao').setValue(estabelecimento.descricao);
    this.options.get('numeroTelefone').setValue(estabelecimento.numeroTelefone);
    this.options.get('cnpj').setValue(estabelecimento.cnpj);
    this.options.get('estado').setValue(estabelecimento.estado);
    this.options.get('cidade').setValue(estabelecimento.cidade);
    this.options.get('imagem').setValue(estabelecimento?.imagem);
  }
}
