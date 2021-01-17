import { ClienteDTO } from './cliente.dto';
import { PedidoItemDTO } from './pedido-item.dto';

export class PedidoDTO {
    id: number;
    dataCadastro: string;
    pedidosItem: Array<PedidoItemDTO>;
    codigoCliente: number;
    cliente: ClienteDTO;
    codigoEstabelecimento: number;
    
}
