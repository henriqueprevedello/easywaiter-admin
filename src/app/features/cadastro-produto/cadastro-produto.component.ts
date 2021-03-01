import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { CategoriaFacade } from 'src/app/core/facades/categoria.facade';
import { ProdutoFacade } from 'src/app/core/facades/produto.facade';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { ProdutoDTO } from 'src/app/models/produto.dto';
import { RotasConstant } from 'src/app/shared/constants/rotas.constant';
import { StringConstant } from 'src/app/shared/constants/string.constant';

@Component({
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss'],
})
export class CadastroProdutoComponent implements OnInit {
  categorias: Array<CategoriaDTO> = [];
  options: FormGroup;
  tipoPagina = StringConstant.CADASTRO;

  idControl = new FormControl();
  nomeControl = new FormControl();
  descricaoControl = new FormControl();
  valorControl = new FormControl(0, Validators.min(0.01));
  ativoControl = new FormControl(true);
  categoriaControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private produtoFacade: ProdutoFacade,
    private categoriaFacade: CategoriaFacade,
    private router: Router,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute
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
    this.activatedRoute.paramMap
      .pipe(
        map((params) => {
          if (params && params.get('id')) {
            this.tipoPagina = StringConstant.EDICAO;

            return params.get('id');
          }

          return null;
        }),
        switchMap((codigoProduto) => {
          if (codigoProduto) {
            return this.produtoFacade.adquirir(codigoProduto).pipe(
              tap((produto) => {
                this.options.get('id').setValue(produto.id);
                this.options.get('ativo').setValue(produto.ativo);
                this.options.get('categoria').setValue(produto.categoria.id);
                this.options.get('descricao').setValue(produto.descricao);
                this.options.get('nome').setValue(produto.nome);
                this.options.get('valor').setValue(produto.valor);
              })
            );
          }

          return of(null);
        }),
        switchMap(() => this.categoriaFacade.adquirirPorEstabelecimento()),
        tap((listaCategorias) => (this.categorias = listaCategorias)),
        catchError((excecao) => {
          this.snackbarService.exibir(
            excecao ?? 'Falha ao editar/cadastrar produto!'
          );
          this.options.reset();
          this.router.navigate([RotasConstant.PRODUTOS]);

          return throwError(excecao);
        }),
        take(1)
      )
      .subscribe();
  }

  cadastrar(): void {
    let produtoDTO: ProdutoDTO = this.options.value;
    produtoDTO.categoria = { id: this.options.value.categoria, nome: null };

    this.produtoFacade
      .cadastrar(produtoDTO)
      .pipe(take(1))
      .subscribe(() => {
        this.options.reset();
        this.router.navigate([RotasConstant.PRODUTOS]);
        this.snackbarService.exibir('Produto cadastrado com sucesso!');
      });
  }

  editar() {
    let produtoDTO: ProdutoDTO = this.options.value;
    produtoDTO.categoria = { id: this.options.value.categoria, nome: null };

    this.produtoFacade
      .editar(produtoDTO)
      .pipe(take(1))
      .subscribe(() => {
        this.options.reset();
        this.router.navigate([RotasConstant.PRODUTOS]);
        this.snackbarService.exibir('Produto editado com sucesso!');
      });
  }

  excluir = () =>
    this.produtoFacade
      .excluir(this.options.value.id)
      .pipe(take(1))
      .subscribe(() => {
        this.options.reset();
        this.router.navigate([RotasConstant.PRODUTOS]);
        this.snackbarService.exibir('Produto excluído com sucesso!');
      });
}
