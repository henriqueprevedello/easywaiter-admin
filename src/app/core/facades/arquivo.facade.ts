import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ArquivoFacadeApi } from './apis/arquivo.facade.api';
import { map } from 'rxjs/operators';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';

@Injectable({ providedIn: 'root' })
export class ArquivoFacade {
  constructor(private api: ArquivoFacadeApi) {}

  upload(arquivo: File): Observable<string> {
    return this.api.upload(arquivo).pipe(map(stringDTO => stringDTO.valor));
  }

  adquirirURLImagem(nomeArquivo: string){
    return EndpointsConstants.ARQUIVO.DOWNLOAD.concat(nomeArquivo);
  }
}
