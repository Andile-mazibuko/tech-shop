import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/models';
import { globalVars } from '../../../utils/global';
import { LoggedInUserService } from '../../services/logged-in-user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  users: User[] = [];
  user: User | null = null;

  constructor(
    private logServ: LoggedInUserService,
    private userServ: UserService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SignupComponent>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.userServ.getUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users.length);

      this.registerForm.get('email')?.valueChanges.subscribe((value) => {
        const exist = this.users.some((user) => user.email === value);
        if (exist) {
          alert(value + ' Already exist please try to log in');
          this.registerForm.get('email')?.setValue('');
        }
      });
    });
  }
 
  cancel() {
    this.dialogRef.close();
  }
 
  register() {
    if (this.registerForm.valid) {
      const user: User = {
        email: this.registerForm.get('email')?.value,
        first_name: this.registerForm.get('first_name')?.value,
        last_name: this.registerForm.get('last_name')?.value,
        password: this.registerForm.get('password')?.value,
      };
      this.userServ.createAccount(user).subscribe((data: User) => {
        globalVars.customerAccess = true;
        this.logServ.setLoggedUser(data);
        this.dialogRef.close(data);
      });
    }
  }
}
