const URL_EASY_WAITER_SERVER = 'http://localhost:3200';

const URL_CONTROLLER_AUTENTICACAO = `${URL_EASY_WAITER_SERVER}/autenticacao`;
const URL_CONTROLLER_PRODUTO = `${URL_EASY_WAITER_SERVER}/produto`;


export class EndpointsConstants {

    static readonly AUTENTICACAO = {
        LOGIN: URL_CONTROLLER_AUTENTICACAO
    };

    static readonly PRODUTO = {
        ADICIONAR: URL_CONTROLLER_PRODUTO,
        ADQUIRIR: URL_CONTROLLER_PRODUTO
    };

}