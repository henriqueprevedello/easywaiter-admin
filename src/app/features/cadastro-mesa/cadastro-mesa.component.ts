import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MesaFacade } from 'src/app/core/facades/mesa.facade';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { RotasConstant } from 'src/app/shared/constants/rotas.constant';
import { StringConstant } from 'src/app/shared/constants/string.constant';

@Component({
  selector: 'app-cadastro-mesa',
  templateUrl: './cadastro-mesa.component.html',
  styleUrls: ['./cadastro-mesa.component.scss'],
})
export class CadastroMesaComponent implements OnInit {
  tipoPagina = StringConstant.CADASTRO;
  options: FormGroup;
  idControl = new FormControl();
  numeroControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.min(1),
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private mesaFacade: MesaFacade,
    private router: Router,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute
  ) {
    this.options = formBuilder.group({
      id: this.idControl,
      numero: this.numeroControl,
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params) => {
      if (params && params.get('id')) {
        this.tipoPagina = StringConstant.EDICAO;
        this.options.get('id').setValue(params.get('id'));
        this.options.get('numero').setValue(params.get('numero'));
      }
    });
  }

  cadastrar() {
    this.mesaFacade
      .cadastrar(this.options.value)
      .pipe(take(1))
      .subscribe(
        () => {
          this.options.reset();
          this.router.navigate([RotasConstant.MESAS]);
          this.snackbarService.exibir('Mesa cadastrada com sucesso!');
        },
        (exception) => {
          this.options.reset();
          this.snackbarService.exibir(exception);
        }
      );
  }

  editar = () =>
    this.mesaFacade
      .editar(this.options.value)
      .pipe(take(1))
      .subscribe(() => {
        this.options.reset();
        this.router.navigate([RotasConstant.MESAS]);
        this.snackbarService.exibir('Mesa editada com sucesso!');
      });

  excluir = () =>
    this.mesaFacade
      .excluir(this.options.value.id)
      .pipe(take(1))
      .subscribe(() => {
        this.options.reset();
        this.router.navigate([RotasConstant.MESAS]);
        this.snackbarService.exibir('Mesa excluida com sucesso!');
      });
}
