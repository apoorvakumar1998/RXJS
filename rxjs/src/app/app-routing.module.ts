import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DomComponent } from './dom/dom.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
  // {
  //   path: '', component: AppComponent
  // },
  {
    path: 'rxjs', component: RxjsComponent
  },
  {
    path: 'dom', component: DomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
