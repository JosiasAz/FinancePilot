# 🧩 FinancePilot

Este projeto foi gerado utilizando o [Angular CLI](https://github.com/angular/angular-cli) na versão 20.0.5.

---

## ▶️ Servidor de Desenvolvimento

Para iniciar um servidor local de desenvolvimento, execute:

```bash
ng serve
````

Após o servidor iniciar, abra seu navegador e acesse `http://localhost:4200/`.
A aplicação será recarregada automaticamente sempre que você modificar os arquivos fonte.

---

## ⚙️ Geração de Código (Scaffolding)

O Angular CLI possui ferramentas poderosas para gerar código automaticamente.
Para gerar um novo componente, execute:

```bash
ng generate component nome-do-componente
```

Para ver a lista completa de esquemas disponíveis (como `components`, `directives` ou `pipes`), use:

```bash
ng generate --help
```

---

## 🏗️ Build do Projeto

Para compilar o projeto para produção:

```bash
ng build
```

A build será armazenada na pasta `dist/`.
Por padrão, a compilação otimiza sua aplicação para performance e velocidade.

---

## 🧪 Executar Testes Unitários

Para rodar os testes unitários usando o [Karma](https://karma-runner.github.io):

```bash
ng test
```

---

## 🧭 Testes de ponta-a-ponta (E2E)

Para executar testes de ponta-a-ponta (end-to-end):

```bash
ng e2e
```

O Angular CLI não vem com um framework de E2E por padrão.
Você pode adicionar o que melhor se adequar às suas necessidades.

---

## 📚 Recursos Adicionais

Para mais informações sobre o Angular CLI e sua documentação completa de comandos:
🔗 [Angular CLI - Visão Geral e Referência de Comandos](https://angular.dev/tools/cli)

---

## 🚀 Funcionalidades

- ✅ Gestão de **Receitas e Despesas** com filtros por período, tipo e status  
- ✅ **Dashboard dinâmico** com gráficos e indicadores em tempo real  
- ✅ Controle de **Metas Financeiras** com cálculo automático de progresso  
- ✅ Módulo de **Pedidos** com exportação, status e ações  
- ✅ Gerenciamento de **Contas Bancárias** com saldo atualizado por lançamentos  
- ✅ Visual moderno com **Angular Material**  
- ✅ SSR com **Vite + Express** para melhor desempenho  

---

## 🛠 Tecnologias

### Front-end
- Angular 20 + Standalone Components
- Angular Material
- Vite + SSR + Express
- TypeScript + SCSS

### Back-end
- FastAPI (Python 3.11+)
- Uvicorn
- SQLite (mock) ou MySQL

### Extras
- RxJS + BehaviorSubject
- XLSX + FileSaver.js
- Figma (para UI/UX)

---

## 📁 Estrutura de Pastas (Frontend)

```
src/
├── app/
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── receitas-despesas/
│   │   ├── metas/
│   │   ├── pedidos/
│   │   └── contas-bancarias/
│   ├── components/
│   ├── models/
│   ├── services/
│   ├── config/
│   └── styles/
├── main.ts
├── main.server.ts
└── server.ts
````

---

## 🧪 Instalação

### Frontend (Angular + SSR)

```bash
npm install
npm run serve:ssr:finpilot
```

### Backend (FastAPI)

```bash
python -m venv venv
source venv/bin/activate     # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📄 Licença

Distribuído sob a licença MIT.
Veja o arquivo `LICENSE` para mais informações.

---
