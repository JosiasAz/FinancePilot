import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaBancariaService } from '../../service/conta-bancaria.service';
import { ContaBancaria } from '../../models/contas-bancarias.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ContaDetalhesDialog } from './conta-detalhes-dialog/conta-detalhes-dialog';
import { NovaContaDialog } from './nova-conta-dialog/nova-conta-dialog';

@Component({
  selector: 'app-contas-bancarias',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './contas-bancarias.html',
  styleUrls: ['./contas-bancarias.scss']
})
export class ContasBancarias implements OnInit {
  contas: ContaBancaria[] = [];

  constructor(
    private contaService: ContaBancariaService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.contaService.listarContas().subscribe((contas) => {
      this.contas = contas;
    });
  }

  abrirFormularioNovaConta(): void {
    const dialogRef = this.dialog.open(NovaContaDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((novaConta: ContaBancaria) => {
      if (novaConta) {
        this.contas.push(novaConta);
      }
    });
  }

  verDetalhes(conta: ContaBancaria): void {
    const dialogRef = this.dialog.open(ContaDetalhesDialog, {
      width: '400px',
      data: { ...conta }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (result.acao === 'remover') {
        this.contas = this.contas.filter((c) => c.id !== result.contaId);
      }

      if (result.acao === 'salvar') {
        this.contas = this.contas.map((c) =>
          c.id === result.conta.id ? result.conta : c

        );
      }
      this.cdr.detectChanges();
    });
  }
}
