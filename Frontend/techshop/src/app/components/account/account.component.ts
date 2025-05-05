import { Component } from '@angular/core';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MatExpansionModule,MatIconModule,MatFormFieldModule,MatInputModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

}
