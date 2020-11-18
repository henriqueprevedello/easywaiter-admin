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

const tipoCadastro = 'cadastro';
const tipoEdicao = 'edicao';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.scss'],
})
export class CadastroCategoriaComponent implements OnInit {
  tipoPagina = tipoCadastro;
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
        this.tipoPagina = tipoEdicao;
        this.options.get('nome').setValue(params.get('nome'));
        this.options.get('id').setValue(params.get('id'));
      }
    });
  }

  cadastrar() {
    this.categoriaFacade
      .cadastrar(this.options.value)
      .pipe(take(1))
      .subscribe(() => {
        this.options.reset();
        this.router.navigate(['/categorias']);
        this.snackbarService.exibir('Categoria cadastrada com sucesso!');
      });
  }

  editar() {
    this.categoriaFacade
      .editar(this.options.value)
      .pipe(take(1))
      .subscribe(() => {
        this.options.reset();
        this.router.navigate(['/categorias']);
        this.snackbarService.exibir('Categoria editada com sucesso!');
      });
  }
}
