import { ClienteDTO } from './cliente.dto';
import { MesaDTO } from './mesa.dto';
import { PedidoDTO } from './pedido.dto';

export class ComandaDTO {
    id: number;
    nomeCliente: string;
    mesa: MesaDTO;
    dataAbertura: string;
    dataFechamento: string;
    pedidos: Array<PedidoDTO>
    cliente: ClienteDTO;
    valorTotal: number;
}
