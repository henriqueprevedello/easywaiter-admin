import { PedidoDTO } from './pedido.dto';

export class ComandaDTO {
    id: number;
    nomeCliente: string;
    mesa: string;
    dataAbertura: string;
    dataFechamento: string;
    pedidos: Array<PedidoDTO>
}
