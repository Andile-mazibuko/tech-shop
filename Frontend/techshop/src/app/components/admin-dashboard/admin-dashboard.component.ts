import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatCardModule,MatSidenavModule,RouterOutlet,RouterModule,MatButtonModule,MatIconModule,NgClass],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  
  isOpen = true

  /**
   * Toggles the width and content of the side bar
   */
  widthToggle(){
    this.isOpen = !this.isOpen
  }
}
