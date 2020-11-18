import { ProdutoDTO } from './produto.dto';

export class PedidoItemDTO {
    id: number;
    quantidade: number;
    codigoProduto: number;
    produto: ProdutoDTO;
}
