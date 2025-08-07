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
      id: [{ value: data.id, disabled: true }],
      nome: [{ value: data.InstituicaoFinanceira, disabled: true }],
      tipo: [{ value: data.tipo, disabled: true }],
      uso: [{ value: data.uso, disabled: true }],
      saldo: [{ value: data.saldo, disabled: true }]
    });
  }

  removerConta(): void {
    this.dialogRef.close({ acao: 'remover', contaId: this.data.id });
  }

  fechar(): void {
    this.dialogRef.close();
  }

  // salvar(): void {
  //   // O botão salvar foi removido da interface visual,
  //   // mas se mantido, aqui está o tratamento de segurança:
  //   if (this.formConta.valid) {
  //     const contaAtualizada: ContaBancaria = this.formConta.getRawValue();
  //     this.dialogRef.close({ acao: 'salvar', conta: contaAtualizada });
  //   }
  // }
}
