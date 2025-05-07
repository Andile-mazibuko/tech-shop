import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../interfaces/models';

@Component({
  selector: 'app-categorised-products',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './categorised-products.component.html',
  styleUrl: './categorised-products.component.scss'
})
export class CategorisedProductsComponent {
  products:Product[] = []
}
