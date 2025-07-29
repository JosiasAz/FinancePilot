import { Routes } from '@angular/router';
// Rotas sem layout
import { Login } from '../user/login/login';
import { Register } from '../user/register/register';
import { LadingPage } from '../pages/lading-page/lading-page';
import { Profile } from '../user/profile/profile';
// Layout
import { Layout } from '../pages/layout/layout';
// Telas com layout
import { Dashboard } from '../pages/dashboard/dashboard';
import { Pedidos } from '../pages/pedidos/pedidos';
import { CriarPedido } from '../pages/criar-pedido/criar-pedido';
import { ReceitasDespesas } from '../pages/receitas-despesas/receitas-despesas';
import { Manutencao } from '../pages/manutencao/manutencao';
import { Admin } from '../admin/admin/admin';
import { ContasBancarias } from '../pages/contas-bancarias/contas-bancarias';

export const routes: Routes = [
  // ROTAS SEM LAYOUT
  { path: '', component: LadingPage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },

  // ROTAS COM LAYOUT COMPARTILHADO
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'pedidos', component: Pedidos },
      { path: 'criarpedido', component: CriarPedido },
      { path: 'receita', component: ReceitasDespesas },
      { path: 'manutencao', component: Manutencao },
      { path: 'admin', component: Admin },
      { path: 'contas', component: ContasBancarias}
    ]
  },

  // Wildcard para rota não encontrada
  { path: '**', redirectTo: '' }
];
