import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './widgets/card/card.component';
import { CardInfoComponent } from './widgets/card-info/card-info.component';
import { PieComponent } from './widgets/pie/pie.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeaderLoggedOutComponent } from './components/header-logged-out/header-logged-out.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderLoggedOutComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    CardInfoComponent,
    PieComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatCardModule,
    MatGridListModule,
  ],
  exports: [
    HeaderComponent,
    HeaderLoggedOutComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    CardInfoComponent,
    PieComponent,
  ],
})
export class SharedModule {}
