import {  Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/app/models/pedido.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'dataCadastro', 'codigoCliente'];
  pedidoExpandido: PedidoDTO | null = ELEMENT_DATA[0];
  constructor() {}

  ngOnInit() {}

  adquirirCorIcone(valorBase: number, valorAtual: number): string {
    if (valorAtual > valorBase * 3) {
      return 'red';
    } else if (valorAtual > valorBase * 2) {
      return 'orange';
    } else if (valorAtual > valorBase) {
      return 'yellow';
    }

    return 'lightskyblue';
  }
}

const ELEMENT_DATA: PedidoDTO[] = [
  {
    id: 1,
    codigoCliente: 1,
    cliente: { nome: 'Henrique Prevedello', email: null, senha: null },
    codigoEstabelecimento: 2,
    dataCadastro: new Date().toLocaleString(),
    pedidosItem: [
      {
        id: 2,
        codigoProduto: 3,
        quantidade: 1,
        produto: {
          id: 1,
          nome: 'Coca-Cola 600ml',
          descricao: '2 Litros',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
      {
        id: 1,
        codigoProduto: 1,
        quantidade: 2,
        produto: {
          id: 1,
          nome: 'Hambúrguer artesanal',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
      {
        id: 1,
        codigoProduto: 1,
        quantidade: 1,
        produto: {
          id: 1,
          nome: 'Porção fritos 500g',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
      {
        id: 1,
        codigoProduto: 1,
        quantidade: 1,
        produto: {
          id: 1,
          nome: 'Água mineral com gás',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      }
    ],
  },
  {
    id: 2,
    codigoCliente: 1,
    cliente: { nome: 'Cliente Dois', email: null, senha: null },
    codigoEstabelecimento: 2,
    dataCadastro: new Date().toLocaleString(),
    pedidosItem: [
      {
        id: 2,
        codigoProduto: 3,
        quantidade: 1,
        produto: {
          id: 1,
          nome: 'jabuticaba',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
      {
        id: 1,
        codigoProduto: 1,
        quantidade: 2,
        produto: {
          id: 1,
          nome: 'jabuticaba asd asd asd asd asd ',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
      {
        id: 1,
        codigoProduto: 1,
        quantidade: 2,
        produto: {
          id: 1,
          nome: 'jabuticaba asd asd asd asd asd ',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
    ],
  },
  {
    id: 3,
    codigoCliente: 1,
    cliente: { nome: 'Exemplo Cliente', email: null, senha: null },
    codigoEstabelecimento: 2,
    dataCadastro: new Date().toLocaleString(),
    pedidosItem: [
      {
        id: 2,
        codigoProduto: 3,
        quantidade: 1,
        produto: {
          id: 1,
          nome: 'jabuticaba',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
      {
        id: 1,
        codigoProduto: 1,
        quantidade: 2,
        produto: {
          id: 1,
          nome: 'jabuticaba asd asd asd asd asd ',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
      {
        id: 1,
        codigoProduto: 1,
        quantidade: 2,
        produto: {
          id: 1,
          nome: 'jabuticaba asd asd asd asd asd ',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
    ],
  },
  {
    id: 4,
    codigoCliente: 1,
    cliente: { nome: 'Cliente 3', email: null, senha: null },
    codigoEstabelecimento: 2,
    dataCadastro: new Date().toLocaleString(),
    pedidosItem: [
      {
        id: 2,
        codigoProduto: 3,
        quantidade: 1,
        produto: {
          id: 1,
          nome: 'jabuticaba',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
      {
        id: 1,
        codigoProduto: 1,
        quantidade: 2,
        produto: {
          id: 1,
          nome: 'jabuticaba asd asd asd asd asd ',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
      {
        id: 1,
        codigoProduto: 1,
        quantidade: 2,
        produto: {
          id: 1,
          nome: 'jabuticaba asd asd asd asd asd ',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
    ],
  },
  {
    id: 5,
    codigoCliente: 1,
    cliente: { nome: 'Cliente 77', email: null, senha: null },
    codigoEstabelecimento: 2,
    dataCadastro: new Date().toLocaleString(),
    pedidosItem: [
      {
        id: 2,
        codigoProduto: 3,
        quantidade: 1,
        produto: {
          id: 1,
          nome: 'jabuticaba',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
      {
        id: 1,
        codigoProduto: 1,
        quantidade: 2,
        produto: {
          id: 1,
          nome: 'jabuticaba asd asd asd asd asd ',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
      {
        id: 1,
        codigoProduto: 1,
        quantidade: 2,
        produto: {
          id: 1,
          nome: 'jabuticaba asd asd asd asd asd ',
          descricao: 'top',
          ativo: true,
          valor: 1,
          categoria: null,
        },
      },
    ],
  },
];
