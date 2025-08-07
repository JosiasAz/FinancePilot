# ✅ Checklist de Integração – FastAPI + Angular

## 🔐 1. Autenticação (Login com JWT)
- [x] Criar tela de login (`login.ts`, `login.html`, `login.scss`)
- [x] Criar `auth.service.ts` com método `login()`
- [x] Salvar o token JWT no `localStorage`
- [x] Criar `auth.interceptor.ts` para enviar o token automaticamente
- [x] Registrar o interceptor no `app.config.ts`

---

## 🔗 2. Configuração da URL da API
- [ ] Criar `api.config.ts` com `baseUrl`
- [ ] Usar `API_CONFIG.baseUrl` em todos os services Angular

---

## 📡 3. Serviços Angular conectando com FastAPI
- [ ] `pedidos.service.ts` – GET e POST de pedidos
- [ ] `receita-despesa.service.ts` – GET de lançamentos financeiros
- [ ] `metas.service.ts` – GET e POST de metas
- [ ] `conta-bancaria.service.ts` – GET e POST de contas

---

## 📄 4. Telas funcionais conectadas com API
- [ ] `pedidos.ts` exibe e cria pedidos reais da API
- [ ] `receitas-despesas.ts` usa dados reais
- [ ] `metas.ts` consome metas reais
- [ ] `contas-bancarias.ts` usa dados reais de contas

---

## 🔒 5. Rotas protegidas da API funcionando
- [ ] `/users/me` retorna o usuário autenticado corretamente
- [ ] `/protected-route` é acessível com token
- [ ] Front impede acesso a telas sem estar logado

---

## 🧹 6. Organização e Boas Práticas
- [ ] `api.config.ts` criado e reutilizado
- [ ] Services limpos e reutilizáveis
- [ ] HTML das páginas usa dados dinâmicos da API
- [ ] Feedback de carregamento e erros visuais no front-end

---

## 🧪 7. Testes de ponta a ponta
- [ ] Testar login com usuário válido
- [ ] Testar redirecionamento para `/dashboard`
- [ ] Testar token sendo enviado no cabeçalho `Authorization`
- [ ] Testar rotas protegidas sem token (erro 401)
- [ ] Testar criação, edição e remoção de dados (CRUD)

