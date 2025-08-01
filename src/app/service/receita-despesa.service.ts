import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ReceitaDespesa {
  id: number;
  tipo: 'Receita' | 'Despesa';
  categoria: string;
  descricao: string;
  valor: number;
  data: string;
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
}

@Injectable({
  providedIn: 'root'
})
export class ReceitaDespesaService {
  private dadosMock: ReceitaDespesa[] = [
    {
      id: 1,
      tipo: 'Receita',
      categoria: 'Salário',
      descricao: 'Salário Mensal',
      valor: 5000,
      data: '2025-07-05',
      status: 'Confirmado'
    },
    {
      id: 2,
      tipo: 'Despesa',
      categoria: 'Aluguel',
      descricao: 'Aluguel do escritório',
      valor: 1500,
      data: '2025-07-01',
      status: 'Confirmado'
    },
    {
      id: 3,
      tipo: 'Receita',
      categoria: 'Freelance',
      descricao: 'Projeto externo concluído',
      valor: 1200,
      data: '2025-07-10',
      status: 'Pendente'
    },
    {
      id: 4,
      tipo: 'Despesa',
      categoria: 'Internet',
      descricao: 'Plano empresarial mensal',
      valor: 250,
      data: '2025-07-03',
      status: 'Confirmado'
    },
    {
      id: 5,
      tipo: 'Despesa',
      categoria: 'Serviços',
      descricao: 'Plataforma de pagamentos',
      valor: 450,
      data: '2025-07-08',
      status: 'Pendente'
    }
  ];

  listarLancamentos(): Observable<ReceitaDespesa[]> {
    return of(this.dadosMock);
  }
}
