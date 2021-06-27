import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/orders/auth-guard.service';
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
  constructor( private _productService: ProductService, private _router: Router,private _authService: AuthGuardService ) { }

  ngOnInit(): void {
    
   this.isAuthorized=this._authService.gettoken()
    this.loadProducts();
  }

  loadProducts(){
    this._productService.getProducts().subscribe(res => {
      console.log(res);
      this.products = res;
    })
  }

  order(product: Product){
    console.log('triggered');
    this._router.navigate(['/orders/order',product.id]);
  }

}
