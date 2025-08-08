import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLogged = localStorage.getItem('isLogged') === 'true';

  if (!isLogged) {
    // Redireciona para o login se não estiver logado
    window.alert('Você precisa estar logado para acessar esta página.');
    return false;
  }

  return true;
};
