import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {
  isLogged = false;
  menuOpen = false;
  activeSection = '';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('isLogged') === 'true';
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

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  irParaCadastro() {
    this.router.navigate(['/register']);
  }

  navigateTo(path: string) {
    if (path === '') {
      localStorage.removeItem('isLogged');
      this.isLogged = false;
      this.router.navigate(['/']);
    } else {
      this.router.navigate([path]);
    }
  }
}
