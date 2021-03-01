import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ComandaFacadeApi } from './apis/comanda.facade.api';
import { ComandaDTO } from 'src/app/models/comanda.dto';

@Injectable({ providedIn: 'root' })
export class ComandaFacade {
  constructor(private api: ComandaFacadeApi) {}

  adquirirTodas(): Observable<Array<ComandaDTO>> {
    return this.api.adquirirTodas();
  }

  adquirir(codigoComanda: string): Observable<ComandaDTO> {
    return this.api.adquirir(codigoComanda);
  }

}
