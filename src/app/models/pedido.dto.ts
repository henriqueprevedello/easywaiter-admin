import { ClienteDTO } from './cliente.dto';
import { PedidoItemDTO } from './pedido-item.dto';

export class PedidoDTO {
  id: number;
  pedidoItens: Array<PedidoItemDTO>;
  codigoCliente: number;
  nomeCliente: string;
  codigoEstabelecimento: number;
  numeroMesa: number;
  codigoMesa: number;
  codigoStatus: number;
  dataCadastro: string;
}
