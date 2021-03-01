import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuard } from './core/guards/autenticacao-guard';
import { CadastroCategoriaComponent } from './features/cadastro-categoria/cadastro-categoria.component';
import { CadastroMesaComponent } from './features/cadastro-mesa/cadastro-mesa.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EstabelecimentoComponent } from './features/estabelecimento/estabelecimento.component';
import { ListagemCategoriasComponent } from './features/listagem-categorias/listagem-categorias.component';
import { ListagemComandasComponent } from './features/listagem-comandas/listagem-comandas.component';
import { ListagemMesasComponent } from './features/listagem-mesas/listagem-mesas.component';
import { ListagemProdutosComponent } from './features/listagem-produtos/listagem-produtos.component';
import { LoginPageComponent } from './features/login/page/login-page.component';
import { NaoEncontradoComponent } from './features/nao-encontrado/nao-encontrado/nao-encontrado.component';
import { CadastroProdutoComponent } from './features/cadastro-produto/cadastro-produto.component';
import { SemConexaoComponent } from './features/sem-conexao/sem-conexao.component';
import { SuporteComponent } from './features/suporte/suporte.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DetalharComandaComponent } from './features/detalhar-comanda/detalhar-comanda.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        // TODO
        canActivate: [AutenticacaoGuard],
      },
      {
        path: 'produtos',
        component: ListagemProdutosComponent,
      },
      {
        path: 'cadastro-produto',
        component: CadastroProdutoComponent,
      },
      {
        path: 'estabelecimento',
        component: EstabelecimentoComponent,
      },
      {
        path: 'comandas',
        component: ListagemComandasComponent,
      },
      {
        path: 'detalhar-comanda',
        component: DetalharComandaComponent,
      },
      {
        path: 'suporte',
        component: SuporteComponent,
      },
      {
        path: 'mesas',
        component: ListagemMesasComponent,
      },
      {
        path: 'cadastro-mesa',
        component: CadastroMesaComponent,
      },
      {
        path: 'categorias',
        component: ListagemCategoriasComponent,
      },
      {
        path: 'cadastro-categoria',
        component: CadastroCategoriaComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'nao-encontrado',
    component: NaoEncontradoComponent,
  },
  {
    path: 'sem-conexao',
    component: SemConexaoComponent,
  },
  {
    path: '**',
    redirectTo: 'nao-encontrado',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
