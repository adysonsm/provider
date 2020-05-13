import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
} from '@nebular/theme';


import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbProgressBarModule,
    LeafletModule,
    NbListModule,
    NgxEchartsModule
  
  ],
  declarations: [
    ECommerceComponent,
    ModalConfirmationComponent,
    FormModalComponent,
  ],
  providers: [
    DashboardService
  ],
})
export class ECommerceModule { }
