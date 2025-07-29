import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-receitas-despesas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './receitas-despesas.html',
  styleUrls: ['./receitas-despesas.scss']
})
export class ReceitasDespesas {
  filtro = {
    tipo: 'todos',
    periodo: 'mes',
    categoria: 'todas'
  };

  data = [
    { descricao: 'Venda Produto X', tipo: 'Receita', valor: 2500, status: 'Confirmado' },
    { descricao: 'Pagamento Conta Y', tipo: 'Despesa', valor: 1200, status: 'Pendente' }
  ];

  displayedColumns = ['descricao', 'tipo', 'valor', 'status', 'acoes'];

  receitas = 18500;
  despesas = 7400;

  get saldo() {
    return this.receitas - this.despesas;
  }

  exportar() {
    console.log('Exportar...');
    // lógica para exportar CSV pode ser colocada aqui
  }

  novoLancamento() {
    console.log('Novo lançamento...');
    // abrir modal ou redirecionar para outro formulário
  }

  editar(item: any) {
    console.log('Editar item:', item);
    // lógica para edição
  }

  excluir(item: any) {
    console.log('Excluir item:', item);
    this.data = this.data.filter(d => d !== item);
  }
}
