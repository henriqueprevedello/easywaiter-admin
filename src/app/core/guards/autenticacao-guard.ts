import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AutenticacaoService } from '../service/autenticacao.service';

@Injectable({ providedIn: 'root' })
export class AutenticacaoGuard implements CanActivate {
  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.autenticacaoService.usuarioAtual;
    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}
