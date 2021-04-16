import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ArquivoFacadeApi } from './apis/arquivo.facade.api';

@Injectable({ providedIn: 'root' })
export class ArquivoFacade {
  constructor(private api: ArquivoFacadeApi) {}

  upload(arquivo: File): Observable<string> {
    return this.api.upload(arquivo);
  }

  download(nomeArquivo: string): Observable<File> {
    return this.api.download(nomeArquivo);
  }
}
