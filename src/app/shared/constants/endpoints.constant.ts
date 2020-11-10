const URL_EASY_WAITER_SERVER = 'http://localhost:3200';

const URL_CONTROLLER_AUTENTICACAO = `${URL_EASY_WAITER_SERVER}/autenticacao`;
const URL_CONTROLLER_PRODUTO = `${URL_EASY_WAITER_SERVER}/produto`;
const URL_CONTROLLER_COMANDA = `${URL_EASY_WAITER_SERVER}/comanda`;
const URL_CONTROLLER_MESA = `${URL_EASY_WAITER_SERVER}/mesa`;
const URL_CONTROLLER_CATEGORIA = `${URL_EASY_WAITER_SERVER}/categoria`;
const URL_CONTROLLER_CONEXAO = `${URL_EASY_WAITER_SERVER}/conexao`;


export class EndpointsConstants {

    static readonly AUTENTICACAO = {
        LOGIN: URL_CONTROLLER_AUTENTICACAO
    };

    static readonly PRODUTO = {
        ADICIONAR: URL_CONTROLLER_PRODUTO,
        ADQUIRIR: URL_CONTROLLER_PRODUTO
    };

    static readonly COMANDA = {
        ADQUIRIR_TODAS: URL_CONTROLLER_COMANDA
    };

    static readonly MESA = {
        ADQUIRIR_POR_ESTABELECIMENTO: URL_CONTROLLER_MESA,
        CADASTRAR: URL_CONTROLLER_MESA,
    };

    static readonly CATEGORIA = {
        ADQUIRIR_POR_ESTABELECIMENTO: URL_CONTROLLER_CATEGORIA,
        CADASTRAR: URL_CONTROLLER_CATEGORIA,
        EDITAR: URL_CONTROLLER_CATEGORIA.concat('/editar'),
    };

    static readonly CONEXAO = {
        TESTAR: URL_CONTROLLER_CONEXAO
    };

}