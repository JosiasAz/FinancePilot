import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ContaBancaria } from '../../../models/contas-bancarias.model';

@Component({
  selector: 'app-conta-detalhes-dialog',
  standalone: true,
  templateUrl: './conta-detalhes-dialog.html',
  styleUrls: ['./conta-detalhes-dialog.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class ContaDetalhesDialog {
  formConta: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ContaDetalhesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ContaBancaria,
    private fb: FormBuilder
  ) {
    this.formConta = this.fb.group({
      id: [data.id],
      nome: [data.InstituicaoFinanceira],
      tipo: [data.tipo],
      uso: [data.uso],
      saldo: [data.saldo]
    });
  }

  removerConta(): void {
    this.dialogRef.close({ acao: 'remover', contaId: this.data.id });
  }

  fechar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.formConta.valid) {
      const contaAtualizada: ContaBancaria = this.formConta.value;
      this.dialogRef.close({ acao: 'salvar', conta: contaAtualizada });
    }
  }
}
