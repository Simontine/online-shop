import { Component, OnInit , Input } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { product } from 'src/app/models/product.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( public fb:FormBuilder) { }

  @Input() products:product[];
  
  ngOnInit(): void {
  }

  searchform = this.fb.group(
    {
        searchbar:["" , Validators.required]
    }
  );
  get searchbar() { return this.searchform.get('searchbar'); }

  search(){
   
   const searchval=this.searchform.value;
   console.log(searchval.searchbar);
   if(searchval){
      if(searchval.searchbar && typeof searchval.searchbar == 'string')
        {
          console.log(this.products)
        this.products=this.products.filter((product)=>product.category === searchval.searchbar|| product.name == searchval.searchbar);
        console.log(this.products.filter((product)=>product.name === searchval.searchbar));
        }
    }
  }

}