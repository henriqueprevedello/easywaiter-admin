import { PedidoItemDTO } from './pedido-item.dto';
import { UsuarioDTO } from './usuario.dto';

export class PedidoDTO {
    id: number;
    dataCadastro: string;
    pedidosItem: Array<PedidoItemDTO>;
    codigoCliente: number;
    cliente: UsuarioDTO;
    codigoEstabelecimento: number;
}
