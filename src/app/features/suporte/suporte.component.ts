import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/service/snackbar.service';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.component.html',
  styleUrls: ['./suporte.component.scss']
})
export class SuporteComponent implements OnInit {

  constructor(private router: Router, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  enviar(){
    this.router.navigate(['/']);
    this.snackbarService.exibir('Enviado!');
  }

}
