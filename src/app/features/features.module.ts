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
import { ProdutoComponent } from './produto/produto.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { EstabelecimentoComponent } from './estabelecimento/estabelecimento.component';
import { ListagemComandasComponent } from './listagem-comandas/listagem-comandas.component';
import { SuporteComponent } from './suporte/suporte.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LoginPageComponent,
    NaoEncontradoComponent,
    ListagemProdutosComponent,
    ProdutoComponent,
    EstabelecimentoComponent,
    ListagemComandasComponent,
    SuporteComponent,
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
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [DashboardComponent, LoginPageComponent, NaoEncontradoComponent],
})
export class FeaturesModule {}
