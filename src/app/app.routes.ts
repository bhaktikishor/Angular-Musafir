import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SavedComponent } from './component/saved/saved.component';
import { PlannerComponent } from './component/planner/planner.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'wishlist',component:SavedComponent},
    {path:'planner',component:PlannerComponent}
];

@NgModule({
    imports:[RouterModule],
    exports:[RouterModule]
})

export class AppRoutingModule {}
