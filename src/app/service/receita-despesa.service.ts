import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, map, mergeMap } from 'rxjs';
import { ReceitaDespesa } from '../models/receita-despesa.model';
import { PedidosService } from './pedidos.service';

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
      status: 'Confirmado',
    },
    {
      id: 2,
      tipo: 'Despesa',
      categoria: 'Aluguel',
      descricao: 'Aluguel do escritório',
      valor: 1500,
      data: '2025-07-01',
      status: 'Confirmado',
    },
    {
      id: 3,
      tipo: 'Receita',
      categoria: 'Freelance',
      descricao: 'Projeto externo concluído',
      valor: 1200,
      data: '2025-07-10',
      status: 'Pendente',
    },
    {
      id: 4,
      tipo: 'Despesa',
      categoria: 'Internet',
      descricao: 'Plano empresarial mensal',
      valor: 250,
      data: '2025-07-03',
      status: 'Confirmado',
    },
    {
      id: 5,
      tipo: 'Despesa',
      categoria: 'Serviços',
      descricao: 'Plataforma de pagamentos',
      valor: 450,
      data: '2025-07-08',
      status: 'Pendente',
    },
  ];

  private dadosSubject = new BehaviorSubject<ReceitaDespesa[]>(this.dadosMock);

  constructor(private pedidosService: PedidosService) { }

  listarLancamentos(): Observable<ReceitaDespesa[]> {
    return combineLatest([
      this.dadosSubject.asObservable(),
      this.pedidosService.listarPedidos()
    ]).pipe(
      map(([lancamentosExistentes, pedidosListados]) => {
        const novosPedidos: ReceitaDespesa[] = pedidosListados
          .filter(p =>
            p.status === 'Pago' &&
            !lancamentosExistentes.some(l => l.descricao === `Pedido #${p.codigo}`)
          )
          .map((p, i) => ({
            id: 1000 + i,
            tipo: 'Receita' as 'Receita',
            categoria: 'Venda',
            descricao: `Pedido #${p.codigo}`,
            valor: p.valor,
            data: p.data ?? new Date().toISOString(),
            status: 'Confirmado' as 'Confirmado'
          }));

        const resultado = [...lancamentosExistentes, ...novosPedidos];
        return resultado.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      })
    );
  }


  adicionarLancamento(lancamento: Omit<ReceitaDespesa, 'id'>): void {
    const novoId =
      this.dadosMock.length > 0
        ? Math.max(...this.dadosMock.map((l) => l.id)) + 1
        : 1;
    const novoLancamento = { id: novoId, ...lancamento };
    this.dadosMock.push(novoLancamento);
    this.dadosSubject.next([...this.dadosMock]);
  }

  criarReceita(lancamento: Omit<ReceitaDespesa, 'id'>): void {
    this.adicionarLancamento(lancamento);
  }

  verificarSeReceitaExiste(codigoPedido: number): boolean {
    return this.dadosMock.some(
      (l) => l.tipo === 'Receita' && l.descricao === `Pedido #${codigoPedido}`
    );
  }

  getReceitasDespesas(): Observable<ReceitaDespesa[]> {
    return combineLatest([
      this.dadosSubject.asObservable(),
      this.pedidosService.listarPedidos()
    ]).pipe(
      map(([lancamentos, pedidos]) => {
        const receitasPedidos: ReceitaDespesa[] = pedidos
          .filter(p =>
            p.status === 'Pago' &&
            !lancamentos.some(l => l.descricao === `Pedido #${p.codigo}`)
          )
          .map((p, i) => ({
            id: 1000 + i,
            tipo: 'Receita' as const,
            categoria: 'Venda',
            descricao: `Pedido #${p.codigo}`,
            valor: p.valor,
            data: p.data ?? new Date().toISOString(),
            status: 'Confirmado' as const
          }));

        const resultado = [...lancamentos, ...receitasPedidos];
        return resultado.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      })
    );
  }


}
