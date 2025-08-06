import { BehaviorSubject, Observable } from 'rxjs';
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
    { codigo: 4, data: '2025-06-08', valor: 500, metodo: 'Boleto', status: 'Pago' },
    { codigo: 5, data: '2025-08-01', valor: 700, metodo: 'Pix', status: 'Pago' },
    { codigo: 6, data: '2025-08-03', valor: 1500, metodo: 'Crédito', status: 'Pendente' },
    { codigo: 7, data: '2025-07-20', valor: 320, metodo: 'Débito', status: 'Cancelado' },
    { codigo: 8, data: '2025-06-22', valor: 1250, metodo: 'Boleto', status: 'Pago' },
    { codigo: 9, data: '2025-05-15', valor: 980, metodo: 'Pix', status: 'Pendente' },
    { codigo: 10, data: '2025-04-09', valor: 440, metodo: 'Crédito', status: 'Pago' },
    { codigo: 11, data: '2025-03-19', valor: 650, metodo: 'Débito', status: 'Cancelado' },
    { codigo: 12, data: '2025-02-27', valor: 2000, metodo: 'Boleto', status: 'Pendente' },
    { codigo: 13, data: '2025-08-05', valor: 1200, metodo: 'Pix', status: 'Pago' },
    { codigo: 14, data: '2025-08-06', valor: 860, metodo: 'Crédito', status: 'Pago' },
  ];

  private pedidosSubject = new BehaviorSubject<Pedido[]>(this.pedidosMock);

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
    this.pedidosMock = this.pedidosMock.map(p =>
      p.codigo === codigo ? { ...p, status: novoStatus } : p
    );
    this.pedidosSubject.next([...this.pedidosMock]);
  }
}
