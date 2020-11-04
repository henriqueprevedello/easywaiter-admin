import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacaoService } from 'src/app/core/service/autenticacao.service';
import { UsuarioDTO } from 'src/app/models/usuario.dto';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  usuarioAtual: Observable<UsuarioDTO>;

  constructor(private autenticacaoService: AutenticacaoService) {
    this.usuarioAtual = autenticacaoService.usuarioAtual;
  }

  ngOnInit() {}
}
