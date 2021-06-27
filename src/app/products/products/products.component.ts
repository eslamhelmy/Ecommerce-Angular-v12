import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/orders/auth-guard.service';
import { PagingModel } from '../models/paging';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isAuthorized:boolean=false;
  pageNumber: number = 1;
  categoryId: number = -1;
  pagination: PagingModel | undefined ;
  constructor( private _productService: ProductService, private _router: Router,private _authService: AuthGuardService ) { }

  ngOnInit(): void {
    
   this.isAuthorized=this._authService.gettoken()
    this.loadProducts(this.pageNumber, this.categoryId);
  }

  loadProducts(pageNumber: number, category:number){
    this._productService.getProducts(pageNumber,category).subscribe(res => {
      this.products = res.items;
      this.pagination = {currentPage: res.currentPage, totalPages: res.totalPages, totalItems:res.totalItems};
      console.log(this.pagination);
    })
  }

  order(product: Product){
    console.log('triggered');
    this._router.navigate(['/orders/order',product.id]);
  }

  pageChanged(event:any){
    this.pageNumber = event.page;
    this.loadProducts(this.pageNumber,this.categoryId);
    
  }

}
