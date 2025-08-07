import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nova-conta-dialog',
  standalone: true,
  templateUrl: './nova-conta-dialog.html',
  styleUrls: ['./nova-conta-dialog.scss'],
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
export class NovaContaDialog {
  formNovaConta: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NovaContaDialog>,
    private fb: FormBuilder
  ) {
    this.formNovaConta = this.fb.group({
      InstituicaoFinanceira: ['', Validators.required],
      tipo: ['', Validators.required],
      uso: ['', Validators.required],
      saldo: ['', [Validators.required, Validators.min(0)]]
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.formNovaConta.valid) {
      this.dialogRef.close(this.formNovaConta.value);
    }
  }
}
