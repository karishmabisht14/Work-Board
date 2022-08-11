import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterDataResolver } from 'src/core/providers/resolvers/masterData.resolver';
import { TaskDataResolver } from 'src/core/providers/resolvers/taskData.resolver';
import { UserDataResolver } from 'src/core/providers/resolvers/userData.resolver.';
import { BoardComponent } from './common/board/board.component';
import { CategoryComponent } from './main/category/category.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/category',
    pathMatch: 'full'
  },
  {
    path: 'category',
    component: CategoryComponent,
    resolve: {
      userdata: UserDataResolver,
      categories: MasterDataResolver
    },
  },
  {
    path: 'category/:id',
    component: BoardComponent,
    resolve: {
      userdata: UserDataResolver,
      categories: MasterDataResolver,
      tasks: TaskDataResolver,
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
