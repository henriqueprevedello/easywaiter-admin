import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/service/autenticacao.service';
import { RotasConstant } from '../../constants/rotas.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) {}

  logout() {
    this.autenticacaoService.logout();
    this.router.navigate([RotasConstant.LOGIN]);
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
