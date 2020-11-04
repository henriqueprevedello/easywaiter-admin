import { Component, OnInit } from '@angular/core';
import { ComandaFacade } from 'src/app/core/facades/comanda.facade';
import { ComandaDTO } from 'src/app/models/comanda.dto';

@Component({
  selector: 'app-listagem-comandas',
  templateUrl: './listagem-comandas.component.html',
  styleUrls: ['./listagem-comandas.component.scss']
})
export class ListagemComandasComponent implements OnInit {

  comandas: Array<ComandaDTO>;

  displayedColumns: string[] = ['id', 'mesa', 'nomeCliente', 'numeroPedidos', 'dataFechamento', 'dataFechamento'];

  constructor(private comandaFacade: ComandaFacade) { }

  ngOnInit(): void {
    this.atualizar();
  }

  atualizar(){
    this.comandaFacade.adquirirTodas().subscribe(todasComandas => (this.comandas = todasComandas));
  }

}
