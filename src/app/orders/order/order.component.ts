import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  quantity: number=1;
  constructor(private _route: ActivatedRoute, private _productService: ProductService,
             private _orderService: OrdersService,private _router:Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
   let productId = this._route.snapshot.paramMap.get('id');
   if(productId)
      this._productService.getProductById(+productId).subscribe(res=>{
        this.product = res;
        this.totalPrice= this.product.newPrice;
        console.log(this.product);
      })
  }

  purchase(){    
    this._orderService.AddOrder({productId:this.product.id, quantity: this.quantity}).subscribe(x=> {
      if(x){  
        this.openSnackBar('Order has been Created Successfully',':)');
        this._router.navigate(['orders/myorders']);
      }
      else
        this.openSnackBar('Error Occured',':(');
    })
  }

  openSnackBar(message: any, action: string) {
    this._snackBar.open(message, action);
  }

  CalcTotalPrice(newPrice:any)
  {
    this.totalPrice=this.quantity*newPrice;
  }

}
