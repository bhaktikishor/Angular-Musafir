import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-planner',
  imports: [FormsModule,CommonModule],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.css'
})
export class PlannerComponent {
  trip={
    destination:"",
    startDate:'',
    endDate:'',
    notes:'',
  };
  submitted=false

  submitPlan(){
    this.submitted=true;
    console.log('trip Plan: ', this.trip)
  }

}
