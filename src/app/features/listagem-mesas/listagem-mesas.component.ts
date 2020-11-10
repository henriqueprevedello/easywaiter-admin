import { Component, OnInit } from '@angular/core';
import { MesaFacade } from 'src/app/core/facades/mesa.facade';
import { MesaDTO } from 'src/app/models/mesa.dto';

@Component({
  selector: 'app-listagem-mesas',
  templateUrl: './listagem-mesas.component.html',
  styleUrls: ['./listagem-mesas.component.scss'],
})
export class ListagemMesasComponent implements OnInit {
  mesas: Array<MesaDTO>;
  displayedColumns: string[] = ['numero'];

  constructor(private mesaFacade: MesaFacade) {}

  ngOnInit(): void {
    this.mesaFacade
      .adquirirPorEstabelecimento()
      .subscribe((listaMesas) => (this.mesas = listaMesas));
  }
}
