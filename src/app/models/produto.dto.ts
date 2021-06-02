import { CategoriaDTO } from './categoria.dto';

export class ProdutoDTO {
    id: number;
    nome: string;
    descricao: string;
    valor: number;
    ativo: boolean;
    codigoCategoria: number;
    categoria: CategoriaDTO;
    imagem: string;
}
