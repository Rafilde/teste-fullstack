import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  sidebarOpen = false;

  constructor(private router: Router, private authService: AuthService) {}
  

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
     this.authService.logout();
  }
}

