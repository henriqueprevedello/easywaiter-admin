import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { ConexaoFacade } from 'src/app/core/facades/estabeleciemnto.facade';
import { SnackbarService } from 'src/app/core/service/snackbar.service';

@Component({
  selector: 'app-sem-conexao',
  templateUrl: './sem-conexao.component.html',
  styleUrls: ['./sem-conexao.component.scss'],
})
export class SemConexaoComponent implements OnInit {
  botaoHabilitado = true;

  constructor(
    private conexaoFacade: ConexaoFacade,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void { }

  tentarNovamente() {
    this.botaoHabilitado = false;

    this.conexaoFacade
      .testar()
      .pipe(finalize(() => (this.botaoHabilitado = true)), take(1))
      .subscribe(
        () => this.router.navigate(['/']),
        () => this.snackbarService.exibir('Sem conexão!')
      );
  }
}
