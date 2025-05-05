import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/models';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = 'http://localhost:8000';
  products: Product[] = [];
  productSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  addProduct(product: Product): void {
    this.http.post(this.apiUrl + '/add_product', product).subscribe((data) => {
      this.fetchProducts();
    });
  }

  getProducts(): Observable<Product[]> {
    this.fetchProducts();
    return this.productSubject.asObservable();
  }

  private fetchProducts(): void {
    this.http
      .get<Product[]>(this.apiUrl + '/get_products')
      .subscribe((data) => {
        this.productSubject.next(data);
      });
  }
}
