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
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../services/snackbar.service';

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
    private dialogRef: MatDialogRef<LoginComponent>,
    private loggedUser: LoggedInUserService,
    private snackBar: SnackbarService
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
      password: this.loginForm.get('password')?.value,
    };
    this.userServ
      .login(LOGIN_DETAILTS)
      .pipe(
        catchError((err) => {
          if (err.status == 500) {
            //Display error on the snack bar
            this.snackBar.openSnackBar('Incorrect Log in credentials');
          } else if (err.status == 404) {
            this.snackBar.openSnackBar("Account not Found")
          }
          return EMPTY;
        })
      )
      .subscribe((data: User) => {
        this.loggedUser.setLoggedUser(data);
        this.dialogRef.close(data);
        this.snackBar.openSnackBar('You have logged in successfully');
      });

    globalVars.customerAccess = true;
  }
  signUp() {
    this.close();
    this.dialog.open(SignupComponent, { width: '600px' });
  }
  close() {
    this.dialogRef.close();
  }

}
