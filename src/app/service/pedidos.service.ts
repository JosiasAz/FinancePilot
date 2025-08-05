import { BehaviorSubject, Observable } from 'rxjs';
import { ReceitaDespesaService } from './receita-despesa.service';
import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedidos.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private pedidosMock: Pedido[] = [
    { codigo: 1, data: '2025-07-06', valor: 250, metodo: 'Pix', status: 'Pendente' },
    { codigo: 2, data: '2025-07-03', valor: 1000, metodo: 'Crédito', status: 'Cancelado' },
    { codigo: 3, data: '2025-03-04', valor: 2500, metodo: 'Débito', status: 'Pago' },
    { codigo: 4, data: '2025-06-08', valor: 500, metodo: 'Boleto', status: 'Pago' }
  ];

  private pedidosSubject = new BehaviorSubject<Pedido[]>(this.pedidosMock);

  constructor(private receitaDespesaService: ReceitaDespesaService) {}

  listarPedidos(): Observable<Pedido[]> {
    return this.pedidosSubject.asObservable();
  }

  adicionarPedido(novoPedido: Pedido): void {
    const jaExiste = this.pedidosMock.some(p =>
      p.data === novoPedido.data &&
      p.valor === novoPedido.valor &&
      p.metodo === novoPedido.metodo &&
      p.status === novoPedido.status
    );

    if (jaExiste) {
      console.warn('Pedido duplicado detectado. Ignorando inserção.');
      return;
    }

    const ultimoCodigo = this.pedidosMock.length > 0
      ? Math.max(...this.pedidosMock.map(p => p.codigo))
      : 0;

    novoPedido.codigo = ultimoCodigo + 1;
    this.pedidosMock = [...this.pedidosMock, novoPedido];
    this.pedidosSubject.next([...this.pedidosMock]);
  }

  atualizarPedido(codigo: number, novoValor: number, novoMetodo: string): void {
    this.pedidosMock = this.pedidosMock.map(p =>
      p.codigo === codigo ? { ...p, valor: novoValor, metodo: novoMetodo } : p
    );
    this.pedidosSubject.next([...this.pedidosMock]);
  }

  removerPedido(codigo: number): void {
    this.pedidosMock = this.pedidosMock.filter(p => p.codigo !== codigo);
    this.pedidosSubject.next([...this.pedidosMock]);
  }

  atualizarStatusPedido(codigo: number, novoStatus: 'Pago' | 'Pendente' | 'Cancelado'): void {
    this.pedidosMock = this.pedidosMock.map(p => {
      if (p.codigo === codigo) {
        p.status = novoStatus;

        //  Evita criar receita duplicada
        if (
          novoStatus === 'Pago' &&
          !this.receitaDespesaService.verificarSeReceitaExiste(p.codigo)
        ) {
          this.receitaDespesaService.criarReceita({
            tipo: 'Receita',
            categoria: 'Venda',
            descricao: `Pedido #${p.codigo}`,
            valor: p.valor,
            data: p.data,
            status: 'Confirmado'
          });
        }
      }
      return p;
    });

    this.pedidosSubject.next([...this.pedidosMock]);
  }
}
