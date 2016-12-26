import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.compoent";
import {BeerListComponent} from "./beer/beer-list.component";
import {AuthGuard} from "./auth/auth-gaurd.service";


const routes: Routes = [
  {
        path: '',
        component: HomeComponent
  },
  { path: 'cellar',
    component: BeerListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class BeercellarfireRoutingModule { }
