import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, OnDestroy, HostListener } from '@angular/core';
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
export class Navbar implements OnInit, OnDestroy {
  isLogged = false;
  menuOpen = false;
  activeSection = '';
  private readonly scrollOffset = 60; // Offset para ativar a seção
  private readonly sections = ['Inicio', 'porqueEscolher', 'contato'];

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Lógica mais robusta: Garante que `isLogged` seja um booleano.
    // Apenas a string 'true' resultará em `true`. Qualquer outro valor
    // (null, undefined, 'false', etc.) resultará em `false`.
    this.isLogged = localStorage.getItem('isLogged') === 'true';
  }

  // O HostListener gerencia o ciclo de vida do evento de scroll automaticamente.
  @HostListener('window:scroll')
  onScroll(): void {
    let foundSection = false;
    for (const section of this.sections) {
      const el = document.getElementById(section);
      if (el) {
        const top = el.getBoundingClientRect().top;
        const bottom = top + el.offsetHeight;

        if (top <= this.scrollOffset && bottom > this.scrollOffset) {
          this.activeSection = section;
          foundSection = true;
          break; // Sai do loop assim que a seção ativa é encontrada.
        }
      }
    }

    if (!foundSection) {
      this.activeSection = ''; // Limpa a seção ativa se nenhuma corresponder
    }
  }

  ngOnDestroy(): void {
    // Não é mais necessário remover o listener manualmente, o @HostListener cuida disso.
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout(): void {
    localStorage.removeItem('isLogged');
    this.isLogged = false;
    this.router.navigate(['/']);
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault(); // Previne o comportamento padrão do link (salto brusco)
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
