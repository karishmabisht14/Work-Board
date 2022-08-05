import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterDataResolver } from 'src/core/providers/resolvers/masterData.resolver';
import { UserDataResolver } from 'src/core/providers/resolvers/userData.resolver.';
import { BoardComponent } from './common/board/board.component';
import { BoardsComponent } from './main/boards/boards.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
    resolve: {
      userdata: UserDataResolver,
      categories: MasterDataResolver
    }
  },
  {
    path: 'boards/:id',
    component: BoardComponent,
    resolve: {
      categories: MasterDataResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
