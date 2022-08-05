import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/sweetAlert.service';
import { LoginService } from '../services/login.service';
import { ErrorHandlerService } from '../services/error.service';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDataResolver } from '../resolvers/userData.resolver.';
import { MasterDataResolver } from '../resolvers/masterData.resolver';
import { BoardCategoryService } from '../services/boardCategory.service';

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ApiService,
    AlertService,
    LoginService,
    ErrorHandlerService,
    NgbProgressbarConfig,
    UserDataResolver,
    MasterDataResolver,
    BoardCategoryService
  ],
})
export class SharedModule { }
