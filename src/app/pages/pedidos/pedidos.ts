import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Pedido, PedidosService } from '../../service/pedidos.service';
import { CriarPedido } from '../criar-pedido/criar-pedido';


@Component({
  selector: 'app-pedidos',
  standalone: true,
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    CriarPedido
  ]
})
export class Pedidos implements OnInit {
  colunas: string[] = ['select', 'codigo', 'data', 'valor', 'metodo', 'status', 'acoes'];
  pedidos: Pedido[] = [];

  constructor(private pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.pedidosService.listarPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  mostrarFormulario = false;

  abrirFormularioPedido() {
    this.mostrarFormulario = true;
  }

  fecharFormularioPedido() {
    this.mostrarFormulario = false;
  }

  adicionarPedido(pedido: any) {
    this.pedidos.push(pedido);
  }

}