import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MesaFacade } from 'src/app/core/facades/mesa.facade';

@Component({
  selector: 'app-cadastro-mesa',
  templateUrl: './cadastro-mesa.component.html',
  styleUrls: ['./cadastro-mesa.component.scss'],
})
export class CadastroMesaComponent {
  tipoPagina = 'cadastro';
  options: FormGroup;
  numeroControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.min(1)]);

  constructor(private formBuilder: FormBuilder, private mesaFacade: MesaFacade, private router: Router) {
    this.options = formBuilder.group({
      numero: this.numeroControl,
    });
  }

  cadastrar(){
    this.mesaFacade.cadastrar(this.options.value).subscribe(()=>this.options.reset());

    this.router.navigate(['/mesas']);
  }

  editar(){}
}
