import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-receitas-despesas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
  ],
  templateUrl: './receitas-despesas.html',
  styleUrls: ['./receitas-despesas.scss']
})
export class ReceitasDespesas {
  filtroForm: FormGroup;

  receitas = 18500;
  despesas = 7400;

  data = [
    { descricao: 'Venda Produto X', tipo: 'Receita', valor: 2500, status: 'Confirmado' },
    { descricao: 'Pagamento Conta Y', tipo: 'Despesa', valor: 1200, status: 'Pendente' }
  ];

  displayedColumns = ['descricao', 'tipo', 'valor', 'status', 'acoes'];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      tipo: ['todos'],
      periodo: ['mes'],
      categoria: ['todas']
    });
  }

  get saldo() {
    return this.receitas - this.despesas;
  }

  exportar(): void {
    console.log('Exportar');
  }

  novoLancamento(): void {
    console.log('Novo lançamento');
  }
}
