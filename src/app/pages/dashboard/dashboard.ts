import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceitaDespesa } from '../../models/receita-despesa.model';
import { ReceitaDespesaService } from '../../service/receita-despesa.service';
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';

enum PeriodoDashboard {
  Todos = 'todos',
  Hoje = 'hoje',
  Semana = 'semana',
  Mes = 'mes'
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit, AfterViewInit {
  totalReceitas = 0;
  totalDespesas = 0;
  saldo = 0;
  notificacoes: { tipo: 'danger' | 'warning' | 'success', titulo: string, mensagem: string }[] = [];

  filtroPeriodo: PeriodoDashboard = PeriodoDashboard.Todos;
  PeriodoDashboard = PeriodoDashboard;

  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;

  private lineChartInstance: Chart | null = null;
  private barChartInstance: Chart | null = null;

  private receitasPorDia: { [key: string]: number } = {};
  private receitasPorMes: { [key: string]: number } = {};

  constructor(private receitaDespesaService: ReceitaDespesaService) { }

  ngOnInit(): void {
    this.carregarDashboard();
  }

  ngAfterViewInit(): void {
    if (Object.keys(this.receitasPorDia).length) this.criarLineChart();
    if (Object.keys(this.receitasPorMes).length) this.criarBarChart();
  }

  onPeriodoChange(periodo: PeriodoDashboard): void {
    this.filtroPeriodo = periodo;
    this.carregarDashboard();
  }

  private carregarDashboard(): void {
    this.receitaDespesaService.listarLancamentos().subscribe((lancamentos: ReceitaDespesa[]) => {
      // ❗️ Filtra lançamentos por período e apenas os com status "Confirmado"
      const filtrados = lancamentos.filter(l =>
        this.filtrarPorPeriodo(l.data) && l.status === 'Confirmado'
      );

      const receitas = filtrados.filter(l => l.tipo === 'Receita');
      const despesas = filtrados.filter(l => l.tipo === 'Despesa');

      this.totalReceitas = receitas.reduce((acc, atual) => acc + atual.valor, 0);
      this.totalDespesas = despesas.reduce((acc, atual) => acc + atual.valor, 0);
      this.saldo = this.totalReceitas - this.totalDespesas;
      this.notificacoes = []; // limpa notificações anteriores
      if (this.saldo < 0) {
        this.notificacoes.push({
          tipo: 'danger',
          titulo: 'Saldo negativo!',
          mensagem: `Seu saldo está negativo em R$ ${Math.abs(this.saldo).toFixed(2)}. Verifique suas despesas.`
        });
      }

      if (this.totalReceitas < 1000) {
        this.notificacoes.push({
          tipo: 'warning',
          titulo: 'Receitas muito baixas',
          mensagem: 'Suas receitas totais estão abaixo de R$ 1.000 neste período.'
        });
      }

      if (this.totalReceitas > 10000) {
        this.notificacoes.push({
          tipo: 'success',
          titulo: 'Ótimo desempenho!',
          mensagem: 'Suas receitas ultrapassaram R$ 10.000. Continue assim!'
        });
      }


      this.receitasPorDia = this.agruparPorData(receitas);
      this.receitasPorMes = this.agruparPorMes(receitas);

      this.criarLineChart();
      this.criarBarChart();
    });
  }

  private filtrarPorPeriodo(dataStr: string): boolean {
    const data = new Date(dataStr);
    const hoje = new Date();

    switch (this.filtroPeriodo) {
      case PeriodoDashboard.Hoje:
        return data.toDateString() === hoje.toDateString();

      case PeriodoDashboard.Semana: {
        const primeiroDiaSemana = new Date(hoje);
        primeiroDiaSemana.setDate(hoje.getDate() - hoje.getDay());
        const ultimoDiaSemana = new Date(primeiroDiaSemana);
        ultimoDiaSemana.setDate(primeiroDiaSemana.getDate() + 6);
        return data >= primeiroDiaSemana && data <= ultimoDiaSemana;
      }

      case PeriodoDashboard.Mes:
        return data.getMonth() === hoje.getMonth() && data.getFullYear() === hoje.getFullYear();

      default:
        return true;
    }
  }

  private agruparPorData(receitas: ReceitaDespesa[]) {
    const agrupado: { [data: string]: number } = {};
    receitas.forEach(r => {
      agrupado[r.data] = (agrupado[r.data] || 0) + r.valor;
    });
    return agrupado;
  }

  private agruparPorMes(receitas: ReceitaDespesa[]) {
    const agrupado: { [mes: string]: number } = {};
    receitas.forEach(r => {
      const mes = new Date(r.data).toLocaleString('pt-BR', { month: 'short', year: 'numeric' });
      agrupado[mes] = (agrupado[mes] || 0) + r.valor;
    });
    return agrupado;
  }

  private criarLineChart() {
    if (this.lineChartInstance) this.lineChartInstance.destroy();

    const ctx = this.lineChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.lineChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(this.receitasPorDia),
          datasets: [{
            label: 'Receita Diária',
            data: Object.values(this.receitasPorDia),
            borderColor: '#2196f3',
            backgroundColor: 'rgba(33,150,243,0.2)',
            fill: true
          }]
        }
      });
    }
  }

  private criarBarChart() {
    if (this.barChartInstance) this.barChartInstance.destroy();

    const ctx = this.barChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.barChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.receitasPorMes),
          datasets: [{
            label: 'Receita por Mês',
            data: Object.values(this.receitasPorMes),
            backgroundColor: '#4caf50'
          }]
        }
      });
    }
  }
}
