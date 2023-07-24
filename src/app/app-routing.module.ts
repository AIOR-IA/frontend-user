import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './modules/user/user/user.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/user/user.module')
    .then( m => m.UserModule)
  },{
    path: '**',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
