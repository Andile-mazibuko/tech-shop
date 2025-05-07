import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { globalVars } from '../../utils/global';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];
  productSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  addProduct(product: Product): void {
    this.http.post(globalVars.apiUrl+'/add_product', product).subscribe((data) => {
      this.fetchProducts();
    });
  }

  getProducts(): Observable<Product[]> {
    this.fetchProducts();
    return this.productSubject.asObservable();
  }
  getProductsByCategory(category:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${globalVars.apiUrl}/prod_category/${category}`)
  }

  private fetchProducts(): void {
    this.http
      .get<Product[]>(globalVars.apiUrl+'/get_products')
      .subscribe((data) => {
        this.productSubject.next(data);
      });
  }
}
