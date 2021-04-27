import { Component } from '@angular/core';
import { AutenticacaoService } from 'src/app/core/service/autenticacao.service';
import { EstabelecimentoStorageService } from 'src/app/core/service/storage/estabelecimento-storage.service';
import { EstabelecimentoDTO } from 'src/app/models/estabelecimento.dto';
import { UsuarioDTO } from 'src/app/models/usuario.dto';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  usuarioAtual: UsuarioDTO;
  estabelecimento: EstabelecimentoDTO;

  constructor(protected autenticacaoService: AutenticacaoService, protected storage: EstabelecimentoStorageService) {
    this.usuarioAtual = autenticacaoService.usuarioAtualDTO;
    this.estabelecimento = storage.estabelecimento;
  }
}
