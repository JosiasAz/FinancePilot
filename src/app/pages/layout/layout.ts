import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,  
    Navbar,
    Sidebar
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {}
