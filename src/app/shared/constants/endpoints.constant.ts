const URL_EASY_WAITER_SERVER = 'http://localhost:3200';

const URL_CONTROLLER_AUTENTICACAO = `${URL_EASY_WAITER_SERVER}/autenticacao`;


export class EndpointsConstants {

    static readonly AUTENTICACAO = {
        LOGIN: URL_CONTROLLER_AUTENTICACAO
    };

}