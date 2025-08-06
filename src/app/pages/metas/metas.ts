import {
  Component,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Chart } from 'chart.js/auto';

import { ReceitaDespesaService } from '../../service/receita-despesa.service';
import { MetasDialog } from './metas-dialog/metas-dialog';
import { MetaDados } from '../../models/metas.model';
import { ReceitaDespesa } from '../../models/receita-despesa.model';

@Component({
  selector: 'app-metas',
  standalone: true,
  templateUrl: './metas.html',
  styleUrls: ['./metas.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class MetasVsRealizado implements OnInit, AfterViewInit {
  metas: (MetaDados & { icone: string })[] = [];
  private metasUsuario: Record<string, number> = {};
  private chartInstance: Chart | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private receitaDespesaService: ReceitaDespesaService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.carregarMetas();
  }

  ngAfterViewInit(): void { }

  carregarMetas(): void {
    this.receitaDespesaService.listarLancamentos().subscribe((lancamentos: ReceitaDespesa[]) => {
      const totalReceitas = lancamentos
        .filter(l => l.tipo === 'Receita' && l.status === 'Confirmado')
        .reduce((acc, l) => acc + l.valor, 0);

      const totalDespesas = lancamentos
        .filter(l => l.tipo === 'Despesa' && l.status === 'Confirmado')
        .reduce((acc, l) => acc + l.valor, 0);

      const lucro = totalReceitas - totalDespesas;

      this.metas = [
        {
          categoria: 'Receita',
          valorMeta: this.metasUsuario['Receita'] ?? 20000,
          valorRealizado: totalReceitas,
          atingido: totalReceitas / (this.metasUsuario['Receita'] ?? 20000) * 100,
          icone: 'attach_money'
        },
        {
          categoria: 'Despesa',
          valorMeta: this.metasUsuario['Despesa'] ?? 10000,
          valorRealizado: totalDespesas,
          atingido: totalDespesas / (this.metasUsuario['Despesa'] ?? 10000) * 100,
          icone: 'trending_down'
        },
        {
          categoria: 'Lucro',
          valorMeta: this.metasUsuario['Lucro'] ?? 10000,
          valorRealizado: lucro,
          atingido: lucro / (this.metasUsuario['Lucro'] ?? 10000) * 100,
          icone: 'account_balance_wallet'
        }
      ];

      this.gerarGrafico();
      this.cdr.detectChanges();
    });
  }

  abrirFormularioNovaMeta(): void {
    const dialogRef = this.dialog.open(MetasDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.metasUsuario[result.categoria] = result.valorMeta;
        this.zone.run(() => {
          this.carregarMetas();
          this.cdr.detectChanges();
        });
      }
    });
  }

  gerarGrafico(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = document.getElementById('graficoMetas') as HTMLCanvasElement;
    if (!canvas) return;

    // 🔥 Destroi gráfico anterior, se existir
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.metas.map(m => m.categoria),
        datasets: [
          {
            label: 'Meta',
            data: this.metas.map(m => m.valorMeta),
            backgroundColor: '#00008B'
          },
          {
            label: 'Realizado',
            data: this.metas.map(m => m.valorRealizado ?? 0),
            backgroundColor: '#4169E1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  abrirDetalhes(meta: MetaDados): void {
    console.log('Meta clicada:', meta);
  }

  getAlertasEspecificos(): { tipo: string; mensagem: string; cor: string; icone: string }[] {
    return this.metas
      .map(meta => {
        const diferenca = (meta.valorRealizado ?? 0) - meta.valorMeta;
        const atingido = (meta.atingido ?? 0).toFixed(1);

        if (meta.categoria === 'Lucro' && diferenca < 0) {
          return {
            tipo: 'lucro-baixo',
            mensagem: `Meta de lucro abaixo do esperado (–R$ ${Math.abs(diferenca).toLocaleString()})`,
            cor: 'error',
            icone: 'error'
          };
        }

        if (meta.categoria === 'Despesa') {
          if ((meta.atingido ?? 0) > 120) {
            return {
              tipo: 'despesa-estourada',
              mensagem: `Meta de despesa estourada (${atingido}% atingido)`,
              cor: 'error',
              icone: 'error'
            };
          }
          if ((meta.atingido ?? 0) > 100) {
            return {
              tipo: 'despesa-excedida',
              mensagem: `Meta de despesa excedida (${atingido}% atingido)`,
              cor: 'warning',
              icone: 'warning'
            };
          }
          if ((meta.atingido ?? 0) >= 95) {
            return {
              tipo: 'despesa-alerta',
              mensagem: `Despesa quase no limite (${atingido}% atingido)`,
              cor: 'warning',
              icone: 'warning'
            };
          }
        }

        if (meta.categoria === 'Receita') {
          if ((meta.atingido ?? 0) < 80) {
            return {
              tipo: 'receita-baixa',
              mensagem: `Receita abaixo do esperado (${atingido}% atingido)`,
              cor: 'info',
              icone: 'info'
            };
          }
          if ((meta.atingido ?? 0) >= 120) {
            return {
              tipo: 'receita-otima',
              mensagem: `Receita superando expectativas (${atingido}% atingido)`,
              cor: 'success',
              icone: 'check_circle'
            };
          }
        }

        return null;
      })
      .filter((alerta): alerta is NonNullable<typeof alerta> => alerta !== null);
  }
}
