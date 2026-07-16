// Arquivo de compatibilidade - bridge entre o antigo SDK base44 e os novos serviços
import { authService } from './auth';
import { entities } from './entities';

// Objeto compatível com a interface do base44 que as páginas usam
export const base44 = {
  auth: {
    me: () => authService.me(),
    logout: (redirectUrl) => authService.logout(redirectUrl || '/'),
    redirectToLogin: (redirectUrl) => authService.redirectToLogin(redirectUrl),
    updateMe: (data) => authService.updateMe(data),
  },
  entities: entities,
};