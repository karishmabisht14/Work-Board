import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { CategoryComponent } from './main/category/category.component';
import { CardComponent } from './common/card/card.component';
import { HeaderComponent } from './common/header/header.component';
import { BoardComponent } from './common/board/board.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './main/login/login.component';
import { AuthInterceptor } from 'src/core/interceptors';
import { SharedModule } from 'src/core/providers/modules/shared.module';
import { SignupComponent } from './main/signup/signup.component';
import { AddTaskComponent } from './main/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    CategoryComponent,
    CardComponent,
    BoardComponent,
    LoginComponent,
    SignupComponent,
    AddTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
