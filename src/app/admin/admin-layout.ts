import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <!-- Você pode adicionar um menu lateral ou navbar específico para o admin aqui -->
    <router-outlet></router-outlet>
  `
})
export class AdminLayout { }
