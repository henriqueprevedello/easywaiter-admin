import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';
import { MesaDTO } from 'src/app/models/mesa.dto';

@Injectable({ providedIn: 'root' })
export class MesaFacadeApi {
  constructor(private http: HttpClient) {}

  cadastrar(mesaDTO: MesaDTO): Observable<void> {
    return this.http.post<void>(EndpointsConstants.MESA.CADASTRAR, mesaDTO);
  }

  adquirirPorEstabelecimento(): Observable<Array<MesaDTO>> {
    return this.http.get<Array<MesaDTO>>(
      EndpointsConstants.MESA.ADQUIRIR_POR_ESTABELECIMENTO
    );
  }
}
