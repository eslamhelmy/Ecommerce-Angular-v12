import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/product.module')
      .then(mod => mod.ProductModule)
  },
  {
    path: 'order/:id',
    loadChildren: () => import('./orders/order.module')
      .then(mod => mod.OrderModule)
  },

  {
    path: 'user',
    loadChildren: () => import('./users/users.module')
      .then(mod => mod.UsersModule)
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
