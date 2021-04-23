import { ClienteDTO } from './cliente.dto';
import { MesaDTO } from './mesa.dto';
import { PedidoDTO } from './pedido.dto';

export class ComandaDTO {
    id: number;
    nomeCliente: string;
    mesa: MesaDTO;
    pedidos: Array<PedidoDTO>
    cliente: ClienteDTO;
    valorTotal: number;
    dataAbertura: string;
    dataFechamento: string;
    dataPagamento: string;
}
