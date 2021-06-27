import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import {MatFormFieldModule} from '@angular/material/form-field'
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthenticationGuard } from './authentication.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from './add-token.interceptor';
import { MyOrdersComponent } from './my-orders/my-orders.component';


const routes: Routes = [
  { path: 'order/:id', component: OrderComponent, canActivate:[AuthenticationGuard] },
  { path: 'myorders', component: MyOrdersComponent}
];

@NgModule({
  declarations: [
    OrderComponent,
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,

    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ]
})
export class OrderModule { }
