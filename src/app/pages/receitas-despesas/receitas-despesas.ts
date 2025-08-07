import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ReceitaDespesaService } from '../../service/receita-despesa.service';
import { ReceitaDespesa } from '../../models/receita-despesa.model';
import { NovoLancamentoDialog } from './novo-lancamento-dialog/novo-lancamento-dialog';

@Component({
  selector: 'app-receitas-despesas',
  standalone: true,
  templateUrl: './receitas-despesas.html',
  styleUrls: ['./receitas-despesas.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class ReceitasDespesas implements OnInit {
  filtro = {
    tipo: 'todos',
    periodo: 'todos',
    categoria: 'todas'
  };

  todosDados: ReceitaDespesa[] = [];
  data: ReceitaDespesa[] = [];
  displayedColumns = ['descricao', 'tipo', 'valor', 'status', 'acoes'];

  constructor(
    private receitaDespesaService: ReceitaDespesaService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.receitaDespesaService.getReceitasDespesas().subscribe((dados) => {
      this.todosDados = dados.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      this.aplicarFiltros();
    });
  }

  get receitas(): number {
    return this.data
      .filter(d => d.tipo === 'Receita' && d.status === 'Confirmado')
      .reduce((acc, d) => acc + d.valor, 0);
  }

  get despesas(): number {
    return this.data
      .filter(d => d.tipo === 'Despesa' && d.status === 'Confirmado')
      .reduce((acc, d) => acc + d.valor, 0);
  }

  get saldo(): number {
    return this.receitas - this.despesas;
  }

  editar(item: ReceitaDespesa): void {
    if (item.descricao.startsWith('Pedido #')) return;
    console.log('Editar:', item);
  }

  exportarParaExcel(): void {
    const dadosExportacao = this.data.map(item => ({
      Descrição: item.descricao,
      Tipo: item.tipo,
      Categoria: item.categoria,
      Valor: item.valor.toLocaleString('pt-BR', {
      }),
      Data: new Date(item.data).toLocaleDateString('pt-BR'),
      Status: item.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(dadosExportacao);
    const workbook = { Sheets: { 'Lançamentos': worksheet }, SheetNames: ['Lançamentos'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blobData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blobData, 'lancamentos-financeiros.xlsx');
  }

  novoLancamento(): void {
    const dialogRef = this.dialog.open(NovoLancamentoDialog, {
      width: '480px',
      height: '480px',
      panelClass: 'dialog-custom',
      data: null
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.receitaDespesaService.adicionarLancamento(resultado);
        this.receitaDespesaService.getReceitasDespesas().subscribe((dados) => {
          this.todosDados = dados;
          this.aplicarFiltros();
          this.cdr.detectChanges();
        });
      }
    });
  }


  aplicarFiltros(): void {
    const hoje = new Date();
    const semanaInicio = new Date(hoje);
    semanaInicio.setDate(hoje.getDate() - hoje.getDay());
    const semanaFim = new Date(semanaInicio);
    semanaFim.setDate(semanaInicio.getDate() + 6);

    this.data = this.todosDados.filter((item: ReceitaDespesa) => {
      const dataItem = new Date(item.data);

      const passaTipo =
        this.filtro.tipo === 'todos' || item.tipo.toLowerCase() === this.filtro.tipo.toLowerCase();

      const passaCategoria =
        this.filtro.categoria === 'todas' || item.categoria.toLowerCase() === this.filtro.categoria.toLowerCase();

      let passaPeriodo = true;
      if (this.filtro.periodo === 'hoje') {
        passaPeriodo = dataItem.toDateString() === hoje.toDateString();
      } else if (this.filtro.periodo === 'semana') {
        passaPeriodo = dataItem >= semanaInicio && dataItem <= semanaFim;
      } else if (this.filtro.periodo === 'mes') {
        passaPeriodo = dataItem.getMonth() === hoje.getMonth() && dataItem.getFullYear() === hoje.getFullYear();
      }

      return passaTipo && passaCategoria && passaPeriodo;
    });
  }
}
