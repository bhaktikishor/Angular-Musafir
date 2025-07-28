import { CommonModule } from '@angular/common';
import { Component ,OnInit } from '@angular/core';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination';

@Component({
  selector: 'app-saved',
  imports: [CommonModule],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css'
})
export class SavedComponent implements OnInit {

  wishlist:Destination[]=[];

  constructor(private destinationService:DestinationService){}

  ngOnInit(): void {
    this.destinationService.getwhislist().subscribe(data=>{
      this.wishlist=data;
    })
  }
  
  removeItem(id:number){
    this.destinationService.removeFromwhishlist(id)
  }

  clearWishlist(){
    this.wishlist.forEach(item=> this.destinationService.removeFromwhishlist(item.id));
  }
}
