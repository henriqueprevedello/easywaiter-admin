import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';
import { ComandaDTO } from 'src/app/models/comanda.dto';

@Injectable({ providedIn: 'root' })
export class ComandaFacadeApi {
  constructor(private http: HttpClient) {}

  adquirirTodas(): Observable<Array<ComandaDTO>> {
    return this.http.get<Array<ComandaDTO>>(
      EndpointsConstants.COMANDA.ADQUIRIR_TODAS
    );
  }

  adquirir(codigoComanda: string): Observable<ComandaDTO> {
    const params = new HttpParams().set('codigoComanda', codigoComanda);

    return this.http.get<ComandaDTO>(EndpointsConstants.COMANDA.ADQUIRIR, {
      params,
    });
  }
}
