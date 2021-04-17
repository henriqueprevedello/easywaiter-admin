import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ArquivoFacadeApi } from './apis/arquivo.facade.api';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ArquivoFacade {
  constructor(private api: ArquivoFacadeApi) {}

  upload(arquivo: File): Observable<string> {
    return this.api.upload(arquivo).pipe(map(stringDTO => stringDTO.valor));
  }

  download(nomeArquivo: string): Observable<any> {
    return this.api.download(nomeArquivo);
  }
}
