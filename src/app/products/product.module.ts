import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
   { path: '', component: ProductsComponent }
];


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    RouterModule.forChild(routes),
    PaginationModule.forRoot()
  ]
})
export class ProductModule { }
