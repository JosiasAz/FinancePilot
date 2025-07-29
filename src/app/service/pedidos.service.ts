import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
    { codigo: 1, data: '06/07/2025', valor: 250, metodo: 'Pix', status: 'Pendente' },
    { codigo: 2, data: '06/07/2025', valor: 1000, metodo: 'Crédito', status: 'Cancelado' },
    { codigo: 3, data: '08/07/2025', valor: 2500, metodo: 'Débito', status: 'Pago' },
    { codigo: 4, data: '08/07/2025', valor: 500, metodo: 'Boleto', status: 'Pago' }
  ];

  listarPedidos(): Observable<Pedido[]> {
    return of(this.pedidosMock);
  }
}
