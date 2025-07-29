import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-formulario-criar-pedido',
  standalone: true,
  templateUrl: './criar-pedido.html',
  styleUrls: ['./criar-pedido.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CriarPedido {
  @Output() fechar = new EventEmitter<void>();
  @Output() pedidoCriado = new EventEmitter<any>();

  modoEdicao = false;

  pedidoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pedidoForm = this.fb.group({
      cliente: [''],
      produto: [''],
      valor: [''],
      formaPagamento: [''],
      observacao: ['']
    });
  }

  onCancel() {
    this.fechar.emit();
  }

  onSubmit() {
    if (this.pedidoForm.valid) {
      const novoPedido = {
        codigo: Math.floor(Math.random() * 10000),
        data: new Date().toLocaleDateString(),
        valor: this.pedidoForm.value.valor,
        metodo: this.pedidoForm.value.formaPagamento,
        status: 'Pendente'
      };

      this.pedidoCriado.emit(novoPedido);
      this.fechar.emit();
    }
  }
}
