import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-novo-lancamento-dialog',
  standalone: true,
  templateUrl: './novo-lancamento-dialog.html',
  styleUrls: ['./novo-lancamento-dialog.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class NovoLancamentoDialog {
  formLancamento: FormGroup;

  categoriasReceita = ['Salário', 'Freelance', 'Investimentos', 'Aluguel recebido'];
  categoriasDespesa = ['Aluguel', 'Alimentação', 'Transporte', 'Saúde', 'Educação'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NovoLancamentoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formLancamento = this.fb.group({
      descricao: ['', Validators.required],
      tipo: ['', Validators.required],
      categoria: [{ value: '', disabled: true }, Validators.required],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      status: ['Pendente', Validators.required],
      data: [new Date().toISOString().substring(0, 10), Validators.required]
    });

    // Habilita e reseta a categoria ao mudar tipo
    this.formLancamento.get('tipo')?.valueChanges.subscribe(() => {
      const categoriaCtrl = this.formLancamento.get('categoria');
      categoriaCtrl?.enable();
      categoriaCtrl?.reset('');
    });
  }

  get categorias(): string[] {
    const tipo = this.formLancamento.get('tipo')?.value;
    return tipo === 'Receita' ? this.categoriasReceita : tipo === 'Despesa' ? this.categoriasDespesa : [];
  }

  salvar(): void {
    if (this.formLancamento.valid) {
      this.dialogRef.close(this.formLancamento.getRawValue()); // pega inclusive campos desabilitados
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }
}
