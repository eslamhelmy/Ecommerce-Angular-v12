import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor( private _productService: ProductService, private _router: Router ) { }

  ngOnInit(): void {
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
    this._router.navigate(['/order',product.id]);
  }

}
