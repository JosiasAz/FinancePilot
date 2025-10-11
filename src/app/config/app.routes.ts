import { Routes } from '@angular/router';

// Guards
import { authGuard } from '../auth-guard';
import { adminGuard } from '../admin.guard';

// Layouts
import { Layout } from '../pages/layout/layout';
import { AdminLayout } from '../admin/admin-layout';

// Páginas Públicas
import { Login } from '../user/login/login';
import { Register } from '../user/register/register';
import { LadingPage } from '../pages/lading-page/lading-page';
import { NotFound } from '../pages/notfound/notfound';

// Páginas do Usuário
import { Dashboard } from '../pages/dashboard/dashboard';
import { Pedidos } from '../pages/pedidos/pedidos';
import { ReceitasDespesas } from '../pages/receitas-despesas/receitas-despesas';
import { ContasBancarias } from '../pages/contas-bancarias/contas-bancarias';
import { MetasVsRealizado } from '../pages/metas/metas';
import { Profile } from '../user/profile/profile';

// Páginas do Admin
import { Admin as AdminPage } from '../admin/admin/admin';

export const routes: Routes = [
  // Rotas públicas
  { path: '', component: LadingPage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Rotas de usuário autenticado
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'pedidos', component: Pedidos },
      { path: 'receita', component: ReceitasDespesas },
      { path: 'contas', component: ContasBancarias },
      { path: 'metas', component: MetasVsRealizado },
      { path: 'profile', component: Profile },
    ]
  },

  // Rotas de Administrador
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard, adminGuard],
    children: [
        { path: '', component: AdminPage },
    ]
  },

  { path: '**', component: NotFound }
];