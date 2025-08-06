export interface ContaBancaria {
  id: number;
  nome: string;
  tipo: 'Corrente' | 'Poupança' | 'Conta Digital';
  uso: 'Recebimento' | 'Pagamento' | 'Mista';
  saldo: number;
}
