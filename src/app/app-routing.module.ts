import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataResolver } from 'src/core/providers/resolvers/userData.resolver.';
import { BoardComponent } from './common/board/board.component';
import { BoardsComponent } from './main/boards/boards.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
    resolve: [UserDataResolver]
  },
  {
    path: 'boards/:id',
    component: BoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
