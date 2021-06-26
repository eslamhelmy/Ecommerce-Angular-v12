import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/products/models/product';
import { ProductService } from 'src/app/products/product.service';
import { OrdersService } from '../orders.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  product:Product = {id:0,price:0,description:'',name:'',image:'',newPrice:0,discountPercentage:0};
  orderSaved: boolean = false;
  totalPrice:number=0;
  constructor(private _route: ActivatedRoute, private _productService: ProductService, private _orderService: OrdersService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
   let productId = this._route.snapshot.paramMap.get('id');
   if(productId)
      this._productService.getProductById(+productId).subscribe(res=>{
        this.product = res;
        this.totalPrice= this.product.price;
        console.log(this.product);
      })
  }

  purchase(quantity:string){    
    alert(quantity)
    this._orderService.AddOrder({productId:this.product.id, quantity: +quantity}).subscribe(x=> {
      if(x)
        this.openSnackBar('Order has been Created Successfully',':)');
      else
        this.openSnackBar('Error Occured',':(');
    })
  }

  openSnackBar(message: any, action: string) {
    this._snackBar.open(message, action);
  }

  CalcTotalPrice(quantity:any,newPrice:any)
  {
    this.totalPrice=quantity*newPrice;
  }

}
