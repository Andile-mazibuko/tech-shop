import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { User } from '../../interfaces/models';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  user: User | null = null;
  constructor(private logServ: LoggedInUserService) {}
  ngOnInit(): void {
    this.user = this.logServ.getLoggedUser();
  }
}
