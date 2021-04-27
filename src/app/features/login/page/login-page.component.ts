import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/service/autenticacao.service';
import { switchMap, take, tap } from 'rxjs/operators';
import { EstabelecimentoFacade } from 'src/app/core/facades/estabelecimento.facade';
import { EstabelecimentoStorageService } from 'src/app/core/service/storage/estabelecimento-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  error = '';
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private estabelecimentoFacade: EstabelecimentoFacade,
    private estabelecimentoStorage: EstabelecimentoStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.autenticacaoService.possuiUsuarioLogado) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.autenticacaoService
      .login({ email: this.f.email.value, senha: this.f.password.value })
      .pipe(
        switchMap(() => this.estabelecimentoFacade.adquirirLogado()),
        tap((estabelecimento) =>
          this.estabelecimentoStorage.definir(estabelecimento)
        ),
        take(1)
      )
      .subscribe(
        () => this.router.navigate([this.returnUrl]),
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
