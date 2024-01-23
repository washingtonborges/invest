//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Custom 
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '@components/login/login.component';
import { HomeComponent } from '@components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StockCardComponent } from './components/stock-card/stock-card.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { StockDialogComponent } from './components/stock-dialog/stock-dialog.component';
import { StockUploadComponent } from './components/stock-upload/stock-upload.component';
import { StockDialogUploadComponent } from './components/stock-dialog-upload/stock-dialog-upload.component';

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
    StockUploadComponent,
    StockDialogUploadComponent
  ],
  imports: [
    //Custom    
    SharedModule,
    //Angular
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    //Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [SharedModule],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
