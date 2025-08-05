import { PedidosService } from '../../service/pedidos.service';
import { CommonModule, NgIf, NgFor, NgClass, DecimalPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CriarPedido } from './criar-pedido/criar-pedido';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarPedido } from './editar-pedido/editar-pedido';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Pedido } from '../../models/pedidos.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.scss'],
  imports: [
    CommonModule,
    FormsModule,
    NgIf,
    NgFor,
    NgClass,
    DecimalPipe,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    CriarPedido,
    MatDialogModule
  ]
})
export class Pedidos implements OnInit {
  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];
  pedidoSelecionado: boolean[] = [];
  selecionarTodos = false;
  dropdownAberto = false;
  ordemCrescente = true;
  selecionarTodasDatas = false;
  mostrarFormulario = false;

  filtros = {
    codigo: '',
    datasSelecionadas: [] as string[],
    valor: null,
    metodo: '',
    status: ''
  };

  constructor(
    private pedidosService: PedidosService,
    private dialog: MatDialog,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pedidosService.listarPedidos().subscribe((dados) => {
      this.pedidos = dados;
      this.aplicarFiltro();
      this.cdr.detectChanges();
    });
  }

  aplicarFiltro(): void {
    this.pedidosFiltrados = this.pedidos.filter(p =>
      (!this.filtros.codigo || p.codigo.toString().includes(this.filtros.codigo)) &&
      (this.filtros.datasSelecionadas.length === 0 || this.filtros.datasSelecionadas.includes(p.data)) &&
      (!this.filtros.valor || p.valor >= this.filtros.valor) &&
      (!this.filtros.metodo || p.metodo === this.filtros.metodo) &&
      (!this.filtros.status || p.status === this.filtros.status)
    );
  }

  abrirFormularioPedido() {
    this.mostrarFormulario = true;
  }

  fecharFormularioPedido() {
    this.mostrarFormulario = false;
  }

  onPedidoCriado(novoPedido: Pedido) {
    console.log('📥 onPedidoCriado chamado', novoPedido);
    this.pedidosService.adicionarPedido(novoPedido);
  }

  editarPedido(pedido: Pedido) {
    const dialogRef = this.dialog.open(EditarPedido, {
      width: '400px',
      data: pedido
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pedidosService.atualizarPedido(pedido.codigo, result.valor, result.metodo);

        if (pedido.status !== result.status) {
          this.pedidosService.atualizarStatusPedido(pedido.codigo, result.status);
        }
      }
    });
  }

  excluirPedido(pedido: Pedido) {
    this.pedidosService.removerPedido(pedido.codigo);
  }

  get datasOrdenadas(): string[] {
    const datas = [...new Set(this.pedidos.map(p => p.data))];
    return datas.sort((a, b) => this.ordemCrescente ? a.localeCompare(b) : b.localeCompare(a));
  }

  get metodosUnicos(): string[] {
    return [...new Set(this.pedidos.map(p => p.metodo))];
  }

  formatarData(data: string): string {
    if (data.includes('/')) return data;
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  toggleDropdown(): void {
    this.dropdownAberto = !this.dropdownAberto;
  }

  @HostListener('document:click', ['$event'])
  fecharDropdownSeFora(event: Event) {
    const clicouDentro = this.elementRef.nativeElement.contains(event.target);
    if (!clicouDentro && this.dropdownAberto) {
      this.dropdownAberto = false;
    }
  }

  ordenarDatas(crescente: boolean) {
    this.ordemCrescente = crescente;
  }

  alternarTodasDatas(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.filtros.datasSelecionadas = checked ? [...this.datasOrdenadas] : [];
    this.aplicarFiltro();
  }

  todasDatasSelecionadas(): boolean {
    return this.filtros.datasSelecionadas.length === this.datasOrdenadas.length;
  }

  onCheckboxChange(data: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.filtros.datasSelecionadas.push(data);
    } else {
      this.filtros.datasSelecionadas = this.filtros.datasSelecionadas.filter(d => d !== data);
    }
    this.aplicarFiltro();
  }

  selecionarTodosChange() {
    this.pedidoSelecionado = this.pedidosFiltrados.map(() => this.selecionarTodos);
  }

  atualizarSelecionarTodos() {
    this.selecionarTodos = this.pedidoSelecionado.every(v => v);
  }

  exportarParaExcel() {}
}
