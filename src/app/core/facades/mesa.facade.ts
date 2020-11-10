import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MesaFacadeApi } from './apis/mesa.facade.api';
import { MesaDTO } from 'src/app/models/mesa.dto';

@Injectable({ providedIn: 'root' })
export class MesaFacade {
  constructor(private api: MesaFacadeApi) {}

  cadastrar(mesaDTO: MesaDTO): Observable<void> {
    return this.api.cadastrar(mesaDTO);
  }

  adquirirPorEstabelecimento(): Observable<Array<MesaDTO>> {
    return this.api.adquirirPorEstabelecimento();
  }
}
