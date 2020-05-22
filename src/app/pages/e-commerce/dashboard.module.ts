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
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './dashboard.component';
import { ManagerClientComponent } from './manager-client/manager-client.component';
import { ManagerService } from './manager-client/manager-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

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
    NgxEchartsModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,

  
  ],
  declarations: [
    Dashboard,
    ModalConfirmationComponent,
    FormModalComponent,
    ManagerClientComponent,
  ],
  providers: [
    DashboardService,
    ManagerService
  ],
})
export class DashboardModule { }
