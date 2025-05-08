import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private prodServ: ProductService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.prodServ.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
  viewProduct(product: Product): void {
    this.dialog.open(ProductComponent,{width:"800px", data:product})
  }
}
