import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-metas',
  standalone: true,
  templateUrl: './metas.html',
  styleUrls: ['./metas.scss'],
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class MetasVsRealizado implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = document.getElementById('graficoMetas') as HTMLCanvasElement;

      new Chart(canvas, {
        type: 'bar',
        data: {
          labels: ['Receita', 'Despesa', 'Lucro'],
          datasets: [
            {
              label: 'Meta',
              data: [20000, 10000, 10000],
              backgroundColor: '#1976d2'
            },
            {
              label: 'Realizado',
              data: [18500, 9800, 8700],
              backgroundColor: '#4fc3f7'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
