import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { BoardsComponent } from './main/boards/boards.component';
import { CardComponent } from './common/card/card.component';
import { HeaderComponent } from './common/header/header.component';
import { BoardComponent } from './common/board/board.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './common/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './main/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    BoardsComponent,
    CardComponent,
    BoardComponent,
    ModalComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
