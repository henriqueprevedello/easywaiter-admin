import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { switchMap, take, tap } from 'rxjs/operators';
import { ArquivoFacade } from 'src/app/core/facades/arquivo.facade';
import { EstabelecimentoFacade } from 'src/app/core/facades/estabelecimento.facade';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { EstabelecimentoDTO } from 'src/app/models/estabelecimento.dto';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styleUrls: ['./estabelecimento.component.scss'],
})
export class EstabelecimentoComponent implements OnInit {
  arquivo = null;
  fileName = null;
  imagem = null;

  options: FormGroup;
  idControl = new FormControl();
  nomeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  descricaoControl = new FormControl();
  telefoneControl = new FormControl();
  chavePixControl = new FormControl();

  constructor(
    protected formBuilder: FormBuilder,
    private estabelecimentoFacade: EstabelecimentoFacade,
    private snackbarService: SnackbarService,
    private arquivoFacade: ArquivoFacade
  ) {
    this.options = formBuilder.group({
      codigoEstabelecimento: this.idControl,
      nome: this.nomeControl,
      descricao: this.descricaoControl,
      numeroTelefone: this.telefoneControl,
      chavePix: this.chavePixControl,
    });
  }

  ngOnInit(): void {
    this.estabelecimentoFacade
      .adquirirLogado()
      .pipe(
        tap((estabelecimentoLogado) =>
          this.preencherFormulario(estabelecimentoLogado)
        ),
        switchMap(
          (estabelecimento) =>
            (this.imagem = estabelecimento.imagem
              ? this.arquivoFacade.adquirirURLImagem(estabelecimento.imagem)
              : null)
        ),
        take(1)
      )
      .subscribe();
  }

  editar(): void {
    let estabelecimentoDTO: EstabelecimentoDTO = this.options.value;

    this.arquivoFacade
      .upload(this.arquivo)
      .pipe(
        tap((nomeImagem) => (estabelecimentoDTO.imagem = nomeImagem)),
        switchMap(() => this.estabelecimentoFacade.editar(estabelecimentoDTO)),
        take(1)
      )
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
    this.options.get('chavePix').setValue(estabelecimento.chavePix);
  }

  selecionouArquivo(event: any) {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    this.atribuirArquivo(event.target.files[0]);
  }

  private atribuirArquivo(file: File) {
    if (!file.size) {
      this.snackbarService.exibir(
        'Não foi possível carregar a imagem do estabelecimento'
      );

      return;
    }

    this.arquivo = file;

    this.fileName = this.arquivo.name;

    this.options.markAsDirty();

    let reader = new FileReader();

    reader.onload = (e) => (this.imagem = e.target.result);

    reader.readAsDataURL(this.arquivo);
  }

  removerImagem() {
    this.arquivo = null;
    this.imagem = null;
    this.fileName = null;
    this.options.markAsUntouched();
  }
}
