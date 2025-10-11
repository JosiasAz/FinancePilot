import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';
import { Navbar } from './pages/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'FinancePilot';
  
  // Injeta o AuthService para que ele seja instanciado na raiz da aplicação
  constructor(private authService: AuthService) {}
}