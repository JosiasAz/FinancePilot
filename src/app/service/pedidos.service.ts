import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReceitaDespesaService } from './receita-despesa.service';

export interface Pedido {
  codigo: number;
  data: string;
  valor: number;
  metodo: string;
  status: 'Pago' | 'Pendente' | 'Cancelado';
}

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

  constructor(private receitaDespesaService: ReceitaDespesaService) {}

  listarPedidos(): Observable<Pedido[]> {
    return of(this.pedidosMock);
  }

  atualizarStatusPedido(codigo: number, novoStatus: 'Pago' | 'Pendente' | 'Cancelado'): void {
    const pedido = this.pedidosMock.find(p => p.codigo === codigo);
    if (pedido) {
      pedido.status = novoStatus;

      if (novoStatus === 'Pago') {
        this.receitaDespesaService.criarReceita({
          tipo: 'Receita',
          categoria: 'Venda',
          descricao: `Venda código ${pedido.codigo}`,
          valor: pedido.valor,
          data: pedido.data,
          status: 'Confirmado'
        });
      }
    }
  }
}
