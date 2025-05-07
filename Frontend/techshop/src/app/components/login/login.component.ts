import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LogInInterface, User } from '../../interfaces/models';
import { globalVars } from '../../../utils/global';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user!: User;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userServ: UserService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const LOGIN_DETAILTS: LogInInterface = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };
    this.userServ.login(LOGIN_DETAILTS).subscribe((data: User) => {
      console.log(data);
    });

    globalVars.customerAccess = true
    this.close();
  }
  signUp() {
    this.close();
    this.dialog.open(SignupComponent, { width: '600px' });
  }
  close() {
    this.dialogRef.close();
  }
}
