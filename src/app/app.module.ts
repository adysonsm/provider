import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './@theme/theme.module';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbCardModule,
} from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './security/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedInGuard } from './security/loggedin.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
    
  providers: [LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
