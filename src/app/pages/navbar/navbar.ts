import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatButtonModule, MatIconModule,
    MatToolbarModule, MatMenuModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {
  isLoggedIn;
  userRole;
  
  activeSection = '';

  constructor(private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.userRole = this.authService.currentUserRole;
  }

  ngOnInit(): void {
    window.addEventListener('scroll', () => this.onScroll());
  }

  onScroll(): void {
    const sections = ['Inicio', 'porqueEscolher', 'contato'];
    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top <= 60 && top + el.offsetHeight > 60) {
          this.activeSection = section;
          break;
        }
      }
    }
  }
  
  logout(): void {
    this.authService.logout();
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}