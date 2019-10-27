import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateKnightComponent } from './create-knight/create-knight.component';


const routes: Routes = [{
  path: "create/knight",
  component: CreateKnightComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
