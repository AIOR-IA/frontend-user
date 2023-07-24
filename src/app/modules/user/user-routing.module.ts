import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path:'', 
    component: UserComponent,
    children: [
      {
        path: '', component: UsersListComponent
      },
      {
        path: 'edit/:id',component: UsersEditComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
