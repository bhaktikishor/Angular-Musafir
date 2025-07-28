import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  destinations: Destination[]=[];
  searchTerm: string="";
  selectedType:string="all";

  sortOrder: 'asc' | 'desc' | "=" = "asc";

  constructor (private destinatinationService: DestinationService){}

  ngOnInit(): void {
    this.destinatinationService.getDestinations().subscribe(data=>{
      this.destinations=data;
    });
  }

  onSearchChange(){
    this.destinatinationService.setSearchTerm(this.searchTerm)
  }

  setFilter(type:string){
    this.selectedType=type;
    this.destinatinationService.setFilterType(type)
  }

  addToWishlist(destination:Destination){
    this.destinatinationService.addToWishlist(destination);
    alert(`${destination.name} added to wishlist`)
  }

  get filteredDestinations(): Destination[] {
    let filtered= this.destinations.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            d.country.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.selectedType === 'all' || d.type === this.selectedType;
      return matchesSearch && matchesType;
    });
// Sorting

if(this.sortOrder==='asc'){
  filtered=filtered.sort((a,b)=>a.price - b.price);
}else if(this.sortOrder==='desc'){
  filtered=filtered.sort((a,b)=>b.price - a.price)
}
return filtered
  }

  setSort(order:'asc'|'desc'){
    this.sortOrder=order;
  }


}
