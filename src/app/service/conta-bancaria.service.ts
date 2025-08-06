import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContaBancaria } from '../models/contas-bancarias.model';

@Injectable({ providedIn: 'root' })
export class ContaBancariaService {
  removerConta(id: number) {
    throw new Error('Method not implemented.');
  }
  atualizarConta(dadosAtualizados: ContaBancaria) {
    throw new Error('Method not implemented.');
  }
  private contasSubject = new BehaviorSubject<ContaBancaria[]>([
    { id: 1, nome: 'Banco do Brasil', tipo: 'Corrente', uso: 'Mista', saldo: 12000 },
    { id: 2, nome: 'Caixa Econômica', tipo: 'Poupança', uso: 'Recebimento', saldo: 7500 },
    { id: 3, nome: 'Nubank', tipo: 'Conta Digital', uso: 'Pagamento', saldo: 3200 }
  ]);

  listarContas(): Observable<ContaBancaria[]> {
    return this.contasSubject.asObservable();
  }

  adicionarConta(conta: ContaBancaria): void {
    const contas = this.contasSubject.value;
    this.contasSubject.next([...contas, conta]);
  }
}
