import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { Product } from '../../interfaces/models';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { globalVars } from '../../../utils/global';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  products: Product[] = [];
  loggedIn!: boolean
  constructor(private dialog: MatDialog, private prodServ: ProductService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loggedIn = globalVars.customerAccess
    this.prodServ.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
  signUp() {
    this.dialog.open(SignupComponent, { width: '600px' });
  }
  logIn() {
    this.dialog.open(LoginComponent, { width: '1000px', height: '500px' });
  }
  filterProducts(category:string){
   const snap =  this.route.snapshot.paramMap.get("GPU")
   console.log(snap)
  }
}
