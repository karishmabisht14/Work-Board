import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './common/board/board.component';
import { BoardsComponent } from './main/boards/boards.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
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
export class AppRoutingModule {}
