import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoriaFacade } from 'src/app/core/facades/categoria.facade';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { RotasConstant } from 'src/app/shared/constants/rotas.constant';
import { StringConstant } from 'src/app/shared/constants/string.constant';



@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.scss'],
})
export class CadastroCategoriaComponent implements OnInit {
  tipoPagina = StringConstant.CADASTRO;
  options: FormGroup;
  idControl = new FormControl();
  nomeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private categoriaFacade: CategoriaFacade,
    private router: Router,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute
  ) {
    this.options = formBuilder.group({
      id: this.idControl,
      nome: this.nomeControl,
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params) => {
      if (params && params.get('id')) {
        this.tipoPagina = StringConstant.EDICAO;
        this.options.get('nome').setValue(params.get('nome'));
        this.options.get('id').setValue(params.get('id'));
      }
    });
  }

  cadastrar = () =>
    this.categoriaFacade
      .cadastrar(this.options.value)
      .pipe(take(1))
      .subscribe(() => {
        this.options.reset();
        this.router.navigate([RotasConstant.CATEGORIAS]);
        this.snackbarService.exibir('Categoria cadastrada com sucesso!');
      });

  editar = () =>
    this.categoriaFacade
      .editar(this.options.value)
      .pipe(take(1))
      .subscribe(() => {
        this.options.reset();
        this.router.navigate([RotasConstant.CATEGORIAS]);
        this.snackbarService.exibir('Categoria editada com sucesso!');
      });

  excluir = () =>
    this.categoriaFacade
      .excluir(this.options.value.id)
      .pipe(take(1))
      .subscribe(() => {
        this.options.reset();
        this.router.navigate([RotasConstant.CATEGORIAS]);
        this.snackbarService.exibir('Categoria excluida com sucesso!');
      },
      (excecao) => {
        this.options.reset();
        this.router.navigate([RotasConstant.CATEGORIAS]);
        this.snackbarService.exibir(excecao ?? 'Falha ao excluir categoria');
      });
}
