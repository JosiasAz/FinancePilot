import { Routes } from '@angular/router';

// Guards
import { authGuard } from '../auth-guard';

// Rotas sem layout
import { Login } from '../user/login/login';
import { Register } from '../user/register/register';
import { LadingPage } from '../pages/lading-page/lading-page';
import { Profile } from '../user/profile/profile';
import { Admin } from '../admin/admin/admin';

// Layout compartilhado
import { Layout } from '../pages/layout/layout';

// Telas com layout
import { Dashboard } from '../pages/dashboard/dashboard';
import { Pedidos } from '../pages/pedidos/pedidos';
import { ReceitasDespesas } from '../pages/receitas-despesas/receitas-despesas';
import { ContasBancarias } from '../pages/contas-bancarias/contas-bancarias';
import { MetasVsRealizado } from '../pages/metas/metas';
import { CriarPedido } from '../pages/pedidos/criar-pedido/criar-pedido';
import { NotFound } from '../pages/notfound/notfound';

export const routes: Routes = [
  // ROTAS SEM LAYOUT
  { path: '', component: LadingPage },
  { path: 'LandingPage', component: LadingPage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  { path: 'admin', component: Admin },

  // ROTAS COM LAYOUT COMPARTILHADO (PROTEGIDAS PELO GUARD)
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
      { path: 'pedidos', component: Pedidos, canActivate: [authGuard] },
      { path: 'criarpedido', component: CriarPedido, canActivate: [authGuard] },
      { path: 'receita', component: ReceitasDespesas, canActivate: [authGuard] },
      { path: 'contas', component: ContasBancarias, canActivate: [authGuard] },
      { path: 'metas', component: MetasVsRealizado, canActivate: [authGuard] }
    ]
  },

  // ROTA NÃO ENCONTRADA
  { path: '**', component: NotFound }
];
