import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants } from 'src/app/shared/constants/endpoints.constant';
import { MesaDTO } from 'src/app/models/mesa.dto';

@Injectable({ providedIn: 'root' })
export class MesaFacadeApi {
  constructor(private http: HttpClient) {}

  cadastrar(numeroMesa: number): Observable<void> {
    const params = new HttpParams().set('numeroMesa', numeroMesa.toString());

    return this.http.post<void>(EndpointsConstants.MESA.CADASTRAR, null, {
      params,
    });
  }

  adquirirPorEstabelecimento(): Observable<Array<MesaDTO>> {
    return this.http.get<Array<MesaDTO>>(
      EndpointsConstants.MESA.ADQUIRIR_POR_ESTABELECIMENTO
    );
  }

  editar(mesaDTO: MesaDTO): Observable<void> {
    return this.http.put<void>(EndpointsConstants.MESA.EDITAR, mesaDTO);
  }

  excluir(codigoMesa: number): Observable<void> {
    const params = new HttpParams().set('codigoMesa', codigoMesa.toString());

    return this.http.delete<void>(EndpointsConstants.MESA.EXCLUIR, { params });
  }
}
