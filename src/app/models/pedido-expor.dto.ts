import { ClienteDTO } from './cliente.dto';
import { MesaDTO } from './mesa.dto';
import { PedidoItemDTO } from './pedido-item.dto';

export class PedidoExporDTO {
    id: number;
    pedidoItens: Array<PedidoItemDTO>;
    nomeCliente: string;
    mesaDTO: MesaDTO;
    codigoStatus: number;
    dataCadastro: string;
}
