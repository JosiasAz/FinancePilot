import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'admin' | 'user' | null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  currentUserRole = signal<UserRole>(null);

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn.set(this.hasToken());
      this.currentUserRole.set(this.getRoleFromStorage());

      window.addEventListener('storage', (event) => {
        if (event.key === 'user_role' || event.key === 'isLogged') {
          this.isLoggedIn.set(this.hasToken());
          this.currentUserRole.set(this.getRoleFromStorage());
        }
      });
    }
  }

  login(email: string): void {
    const role: UserRole = email.includes('admin') ? 'admin' : 'user';

    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('user_role', role);

    this.isLoggedIn.set(true);
    this.currentUserRole.set(role);

    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  logout(): void {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('user_role');

    this.isLoggedIn.set(false);
    this.currentUserRole.set(null);

    this.router.navigate(['/']);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('isLogged');
  }

  private getRoleFromStorage(): UserRole {
    return localStorage.getItem('user_role') as UserRole;
  }
}