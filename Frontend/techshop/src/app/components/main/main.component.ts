import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private dialog:MatDialog){}
  signUp(){
    this.dialog.open(SignupComponent,{width:"600px"})
  }
  logIn(){
    this.dialog.open(LoginComponent,{width:"1000px",height:"500px"})
  }
}
