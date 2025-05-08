import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../interfaces/models';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categorised-products',
  standalone: true,
  imports: [MatCardModule, CommonModule,MatIconModule,MatButtonModule],
  templateUrl: './categorised-products.component.html',
  styleUrl: './categorised-products.component.scss',
})
export class CategorisedProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private prodServ: ProductService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    
    this.activeRoute.queryParams.subscribe(data => {
      this.prodServ.getProductsByCategory(data['category']).subscribe((data: Product[]) => {
        this.products = data;
      });
    });
  }
}
