//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

//PrimeNG
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';

//Custom 
import { AppComponent } from './app.component';
import { LoginComponent } from '@components/login/login.component';
import { HomeComponent } from '@components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StockCardComponent } from './components/stock-card/stock-card.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { StockDialogComponent } from './components/stock-dialog/stock-dialog.component';
import { IncomeTaxComponent } from './components/income-tax/income-tax.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    StockCardComponent,
    StockListComponent,
    StockFormComponent,
    StockDialogComponent,
    IncomeTaxComponent,
  ],
  imports: [
    //Angular
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    //PrimeNG
    DialogModule,
    ToastModule,
    FileUploadModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    ToolbarModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    AvatarModule,
    IconFieldModule,
    InputIconModule,
    MenubarModule,
    TableModule
  ],
  providers: [DatePipe], 
  bootstrap: [AppComponent]
})
export class AppModule { }
