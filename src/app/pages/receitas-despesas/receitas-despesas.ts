import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { ReceitaDespesaService } from '../../service/receita-despesa.service';
import { ReceitaDespesa } from '../../models/receita-despesa.model';

@Component({
  selector: 'app-receitas-despesas',
  standalone: true,
  templateUrl: './receitas-despesas.html',
  styleUrls: ['./receitas-despesas.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule
  ]
})
export class ReceitasDespesas implements OnInit {
  filtro = {
    tipo: 'todos',
    periodo: 'todos', // <- agora tem opção de exibir todos os períodos
    categoria: 'todas'
  };

  todosDados: ReceitaDespesa[] = [];
  data: ReceitaDespesa[] = [];
  displayedColumns = ['descricao', 'tipo', 'valor', 'status', 'acoes'];

  constructor(private receitaDespesaService: ReceitaDespesaService) {}

  ngOnInit(): void {
    this.receitaDespesaService.listarLancamentos().subscribe((dados) => {
      this.todosDados = dados.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      this.aplicarFiltros(); // Aplica os filtros iniciais ao carregar
    });
  }

  get receitas(): number {
    return this.data
      .filter(d => d.tipo === 'Receita' && d.status === 'Confirmado')
      .reduce((acc, d) => acc + d.valor, 0);
  }

  get despesas(): number {
    return this.data
      .filter(d => d.tipo === 'Despesa' && d.status === 'Confirmado')
      .reduce((acc, d) => acc + d.valor, 0);
  }

  get saldo(): number {
    return this.receitas - this.despesas;
  }

  editar(item: ReceitaDespesa): void {
    if (item.descricao.startsWith('Pedido #')) return;
    console.log('Editar:', item);
  }

  exportar(): void {
    console.log('Exportar...');
  }

  novoLancamento(): void {
    console.log('Novo lançamento...');
  }

  aplicarFiltros(): void {
    const hoje = new Date();
    const semanaInicio = new Date(hoje);
    semanaInicio.setDate(hoje.getDate() - hoje.getDay());
    const semanaFim = new Date(semanaInicio);
    semanaFim.setDate(semanaInicio.getDate() + 6);

    this.data = this.todosDados.filter((item: ReceitaDespesa) => {
      const dataItem = new Date(item.data);

      const passaTipo =
        this.filtro.tipo === 'todos' || item.tipo.toLowerCase() === this.filtro.tipo.toLowerCase();

      const passaCategoria =
        this.filtro.categoria === 'todas' || item.categoria.toLowerCase() === this.filtro.categoria.toLowerCase();

      let passaPeriodo = true;
      if (this.filtro.periodo === 'hoje') {
        passaPeriodo = dataItem.toDateString() === hoje.toDateString();
      } else if (this.filtro.periodo === 'semana') {
        passaPeriodo = dataItem >= semanaInicio && dataItem <= semanaFim;
      } else if (this.filtro.periodo === 'mes') {
        passaPeriodo = dataItem.getMonth() === hoje.getMonth() && dataItem.getFullYear() === hoje.getFullYear();
      } else if (this.filtro.periodo === 'todos') {
        passaPeriodo = true;
      }

      return passaTipo && passaCategoria && passaPeriodo;
    });
  }
}
