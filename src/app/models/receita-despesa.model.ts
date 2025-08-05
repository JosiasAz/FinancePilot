export interface ReceitaDespesa {
  id: number;
  tipo: 'Receita' | 'Despesa';
  categoria: string;
  descricao: string;
  valor: number;
  data: string;
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
}