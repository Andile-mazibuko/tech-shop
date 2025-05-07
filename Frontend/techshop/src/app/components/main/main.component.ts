import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { Product, User } from '../../interfaces/models';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { globalVars } from '../../../utils/global';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { AccountComponent } from '../account/account.component';

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
  user: User | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private prodServ: ProductService,
    private route: ActivatedRoute,
    private logServ: LoggedInUserService
  ) {}

  ngOnInit(): void {
    console.log('MAIN USER', this.user);
    this.prodServ.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
  signUp() {
    this.dialog.open(SignupComponent, { width: '600px' });
  }
  logIn() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '1000px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((data: User) => {
      this.user = data;
      if (data.role?.includes('ADMIN')) {
        globalVars.adminAccess = true
        globalVars.customerAccess = true
        this.router.navigate(['/admin'])
      }
    });
  }
  openAccountInfo(event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const dialogRef = this.dialog.open(AccountComponent, { width: '600px' });
  }
}
