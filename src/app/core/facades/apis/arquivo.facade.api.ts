import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EndpointsConstants } from "src/app/shared/constants/endpoints.constant";
import { StringDTO } from "src/app/models/string.dto";

@Injectable({ providedIn: "root" })
export class ArquivoFacadeApi {
  constructor(private http: HttpClient) {}

  upload(arquivo: File): Observable<StringDTO> {
    const formData = new FormData();

    formData.append("filename", arquivo);

    return this.http.post<StringDTO>(EndpointsConstants.ARQUIVO.UPLOAD, formData);
  }

  download(nomeArquivo: string): Observable<any> {

    return this.http.get(EndpointsConstants.ARQUIVO.DOWNLOAD.concat(nomeArquivo), { responseType: 'blob' });
  }
}
