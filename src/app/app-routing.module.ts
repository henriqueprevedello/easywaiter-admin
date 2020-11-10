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
import { ProdutoComponent } from './features/produto/produto.component';
import { SemConexaoComponent } from './features/sem-conexao/sem-conexao.component';
import { SuporteComponent } from './features/suporte/suporte.component';
import { DefaultComponent } from './layouts/default/default.component';
import { RotasConstant } from './shared/constants/rotas.constant';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AutenticacaoGuard],
      },
      {
        path: 'produtos',
        component: ListagemProdutosComponent,
      },
      {
        path: 'produtos/novo',
        component: ProdutoComponent,
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
    path: RotasConstant.LOGIN,
    component: LoginPageComponent,
  },
  {
    path: RotasConstant.NAO_ENCONTRADO,
    component: NaoEncontradoComponent,
  },
  {
    path: 'sem-conexao',
    component: SemConexaoComponent,
  },
  {
    path: '**',
    redirectTo: RotasConstant.NAO_ENCONTRADO,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// se der pau nos guards ou autenticacao ver em https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial#auth-guard-ts
