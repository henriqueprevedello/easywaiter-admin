import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login/page/login-page.component';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado/nao-encontrado.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ListagemProdutosComponent } from './listagem-produtos/listagem-produtos.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { EstabelecimentoComponent } from './estabelecimento/estabelecimento.component';
import { ListagemComandasComponent } from './listagem-comandas/listagem-comandas.component';
import { SuporteComponent } from './suporte/suporte.component';
import { ListagemMesasComponent } from './listagem-mesas/listagem-mesas.component';
import { CadastroMesaComponent } from './cadastro-mesa/cadastro-mesa.component';
import { CadastroCategoriaComponent } from './cadastro-categoria/cadastro-categoria.component';
import { ListagemCategoriasComponent } from './listagem-categorias/listagem-categorias.component';
import { SemConexaoComponent } from './sem-conexao/sem-conexao.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { DetalharComandaComponent } from './detalhar-comanda/detalhar-comanda.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginPageComponent,
    NaoEncontradoComponent,
    ListagemProdutosComponent,
    CadastroProdutoComponent,
    EstabelecimentoComponent,
    ListagemComandasComponent,
    SuporteComponent,
    ListagemMesasComponent,
    CadastroMesaComponent,
    CadastroCategoriaComponent,
    ListagemCategoriasComponent,
    SemConexaoComponent,
    DetalharComandaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MatToolbarModule
  ],
  exports: [DashboardComponent, LoginPageComponent, NaoEncontradoComponent],
})
export class FeaturesModule {}
