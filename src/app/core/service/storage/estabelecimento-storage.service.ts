import { Injectable } from '@angular/core';
import { EstabelecimentoDTO } from 'src/app/models/estabelecimento.dto';
import { ArquivoFacade } from '../../facades/arquivo.facade';

const ESTABELECIMENTO = 'estabelecimento';

@Injectable({ providedIn: 'root' })
export class EstabelecimentoStorageService {
  constructor(private arquivoFacade: ArquivoFacade) {}

  get estabelecimento(): EstabelecimentoDTO {
    return JSON.parse(localStorage.getItem(ESTABELECIMENTO));
  }

  get possuiEstabelecimentoInformado() {
    if (this.estabelecimento) {
      return true;
    }

    return false;
  }

  definir(estabelecimentoDTO: EstabelecimentoDTO): void {
    estabelecimentoDTO.imagem = estabelecimentoDTO.imagem
      ? this.arquivoFacade.adquirirURLImagem(estabelecimentoDTO.imagem)
      : null;

    localStorage.setItem(ESTABELECIMENTO, JSON.stringify(estabelecimentoDTO));
  }

  limpar() {
    localStorage.removeItem(ESTABELECIMENTO);
  }
}
