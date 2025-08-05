export interface MetaDados {
    categoria: 'Receita' | 'Despesa' | 'Lucro';
    valorMeta: number;
    valorRealizado: number;
    atingido: number; // em porcentagem
}