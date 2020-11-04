import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutenticacaoDTO } from 'src/app/models/autenticacao.dto';
import { UsuarioDTO } from 'src/app/models/usuario.dto';
import { AutenticacaoFacade } from '../facades/autenticacao.facade';

@Injectable({ providedIn: 'root' })
export class AutenticacaoService {
  private usuarioAtualSubject: BehaviorSubject<UsuarioDTO>;
  usuarioAtual: Observable<UsuarioDTO>;

  constructor(
    private autenticacaoFacade: AutenticacaoFacade
  ) {
    this.usuarioAtualSubject = new BehaviorSubject<UsuarioDTO>(
      JSON.parse(localStorage.getItem('usuarioAtual'))
    );

    this.usuarioAtual = this.usuarioAtualSubject.asObservable();
  }

  get usuarioAtualDTO(): UsuarioDTO {
    return this.usuarioAtualSubject.value;
  }

  get possuiUsuarioLogado(){
    if(this.usuarioAtualSubject.value ){
      return true;
    }

    return false;
  }

  login(autenticacaoDTO: AutenticacaoDTO) {
    return this.autenticacaoFacade.login(autenticacaoDTO).pipe(
      map((usuarioDTO: UsuarioDTO) => {
        localStorage.setItem('usuarioAtual', JSON.stringify(usuarioDTO));

        this.usuarioAtualSubject.next(usuarioDTO);

        return usuarioDTO;
      })
    );
  }

  logout() {
    localStorage.removeItem('usuarioAtual');
    this.usuarioAtualSubject.next(null);
  }
}
