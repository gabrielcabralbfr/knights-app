import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateKnightComponent } from './create-knight/create-knight.component';
import { ListKnightComponent } from './list-knight/list-knight.component';


const routes: Routes = [
  {
    path: "create/knight",
    component: CreateKnightComponent
  },
  {
    path: "list/knight",
    component: ListKnightComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
