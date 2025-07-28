import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./component/header/header.component";
import { FooterComponent } from "./component/footer/footer.component";
import { HomeComponent } from "./component/home/home.component";
import { SavedComponent } from "./component/saved/saved.component";
import { PlannerComponent } from "./component/planner/planner.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, SavedComponent, PlannerComponent],
   templateUrl:'./app.component.html',
   styleUrls:['./app.component.css']
   

})
export class AppComponent {
  title = 'Musafir';
}
