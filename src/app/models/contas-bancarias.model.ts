export interface ContaBancaria {
  id: number;
  InstituicaoFinanceira: string;
  tipo: 'Corrente' | 'Poupança' | 'Conta Digital';
  uso: 'Recebimento' | 'Pagamento' | 'Mista';
  saldo: number;
}
