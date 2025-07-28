import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Destination } from '../models/destination';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private destinations = new BehaviorSubject<Destination[]>([]);

  private wishlist:Destination[]=[];
  private wishlistSubject=new BehaviorSubject<Destination[]>([]);

  private searchTerm = new BehaviorSubject<string>('');
  private selectedType = new BehaviorSubject<string>('all')

  constructor (private http:HttpClient){
    this.loadWishlistFromStorage();
  }

  // wishlist

  getDestinations(): Observable<Destination[]>{
    return this.http.get<Destination[]>('assets/mock-destinations.json');
  
  }

  // addToWishlist(destination:Destination){
  //   this.wishlist.push(destination)
  //   this.wishlistSubject.next(this.wishlist);
  // }

  // removeFromwhishlist(id:number){
  //   this.wishlist=this.wishlist.filter(item=> item.id !==id);
  //   this.wishlistSubject.next(this.wishlist);
  // }

  getwhislist(){
    return this.wishlistSubject.asObservable();
  }
 
  // filtering
  setSearchTerm(term:string){
    this.searchTerm.next(term.toLowerCase());
  }
  setFilterType(type:string){
    this.selectedType.next(type);
  }
  getFilteredDestinations():Observable<Destination[]>{
    return combineLatest([
      this.destinations.asObservable(),
      this.searchTerm.asObservable(),
      this.selectedType.asObservable()
    ]).pipe(map(([destinations,search,type])=>{
      const searchLower = search.toLowerCase();
      return destinations.filter(d=>{
        const matchesSearch = d.name.toLowerCase().includes(searchLower) || d.country.toLowerCase().includes(searchLower);
        const matchesType = type === 'all' || d.type === type;
        return matchesSearch &&  matchesType
      });
    })

    );
  }

// localStorage

addToWishlist(destination:Destination){
  if(!this.wishlist.some(item=> item.id ===destination.id)){
    this.wishlist.push(destination);
    this.updateWishlistStorage()
  }
}

  removeFromwhishlist(id:number){
    this.wishlist=this.wishlist.filter(item=> item.id !==id);
    this.updateWishlistStorage();
  }

  private updateWishlistStorage(){
    localStorage.setItem('wishlist',JSON.stringify(this.wishlist));
    this.wishlistSubject.next(this.wishlist)
  }

  private loadWishlistFromStorage(){
    const stored = localStorage.getItem('wishlist');
    this.wishlist=stored?JSON.parse(stored):[];
    this.wishlistSubject.next(this.wishlist)
  }

}
