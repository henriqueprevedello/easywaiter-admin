import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EndpointsConstants } from "src/app/shared/constants/endpoints.constant";

@Injectable({ providedIn: "root" })
export class ArquivoFacadeApi {
  constructor(private http: HttpClient) {}

  upload(arquivo: File): Observable<string> {
    const formData = new FormData();

    formData.append("filename", arquivo);

    return this.http.post<string>(EndpointsConstants.ARQUIVO.UPLOAD, formData);
  }

  download(nomeArquivo: string): Observable<File> {
    return this.http.get<File>(
      EndpointsConstants.ARQUIVO.DOWNLOAD.concat(nomeArquivo)
    );
  }
}
