import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReceitaDespesaService } from '../../../service/receita-despesa.service';


@Component({
  selector: 'app-metas-dialog',
  standalone: true,
  templateUrl: './metas-dialog.html',
  styleUrls: ['./metas-dialog.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class MetasDialog implements OnInit {
  form: FormGroup;
  categorias: string[] = ['Receita', 'Despesa', 'Lucro'];

  constructor(
    private dialogRef: MatDialogRef<MetasDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private receitaDespesaService: ReceitaDespesaService
  ) {
    this.form = this.fb.group({
      categoria: ['', Validators.required],
      valorMeta: [null, [Validators.required, Validators.min(0)]]
    });

    if (data) {
      this.form.patchValue(data);
    }
  }

  ngOnInit(): void {}

  salvar(): void {
    if (this.form.valid) {
      const { categoria, valorMeta } = this.form.value;

      this.receitaDespesaService.getReceitasDespesas().subscribe((dados) => {
        const receitas = dados.filter(d => d.tipo === 'Receita' && d.status === 'Confirmado');
        const despesas = dados.filter(d => d.tipo === 'Despesa' && d.status === 'Confirmado');

        const realizadoReceita = receitas.reduce((acc, r) => acc + r.valor, 0);
        const realizadoDespesa = despesas.reduce((acc, d) => acc + d.valor, 0);
        const realizadoLucro = realizadoReceita - realizadoDespesa;

        let valorRealizado = 0;
        if (categoria === 'Receita') valorRealizado = realizadoReceita;
        else if (categoria === 'Despesa') valorRealizado = realizadoDespesa;
        else if (categoria === 'Lucro') valorRealizado = realizadoLucro;

        const atingido = valorMeta > 0 ? (valorRealizado / valorMeta) * 100 : 0;

        this.dialogRef.close({
          categoria,
          valorMeta,
          valorRealizado,
          atingido
        });
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
