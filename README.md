# Frontend - Gerenciador de Veículos

## Descrição

Aplicação frontend em React para cadastro, edição e gerenciamento de veículos. Possui autenticação, formulários com validação e registro de novo usuário, com navegação utilizando React Router e integração com API backend. Interface responsiva e fácil de usar.

---

## Tecnologias

- React 18+
- React Router DOM
- React Icons
- Axios (para chamadas API)
- CSS / CSS Modules
- JavaScript / TypeScript (se estiver usando TS)
- Biblioteca para notificações (exemplo: react-toastify) 

---

## Funcionalidades

- Tela de login e registro com validação
- Tela de Registro de novo usuário
- Dashboard com listagem de veículos
- Modal para criar, editar, arquivar, desarquivar e excluir veículos
- Mensagens de confirmação para ações importantes
- Armazenamento de token e dados do usuário no localStorage
- Redirecionamento baseado no estado de autenticação
- Navagação entre as telas

---

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/seu-projeto-frontend.git
````

2. Entre na pasta do projeto:

   ```bash
   cd seu-projeto-frontend
   ```

3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Configure o arquivo `.env` (exemplo):

   ```
   REACT_APP_API_URL=http://localhost:3001 (ou outra porta)
   ```

---

## Uso

1. Execute o projeto:

   ```bash
   npm start
   # ou
   yarn start
   ```

2. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

3. Cadastre um novo usuário ou faça login com um existente.

4. Gerencie seus veículos pelo dashboard.

---

## Estrutura do Projeto

```
src/
├── components/      # Componentes reutilizáveis (Modal, Mensagem, etc)
├── pages/           # Páginas da aplicação (Login, Register, Dashboard)
├── service/         # Chamadas à API e lógica de autenticação
├── assets/          # Imagens, ícones e estilos
├── App.tsx          # Configuração das rotas
└── index.tsx        # Ponto de entrada
```

---

## Considerações

* O frontend depende do backend rodando para funcionar corretamente.
* As rotas protegidas exigem autenticação válida.
* Utilize um token JWT para autorização nas requisições.

---

## Contato

Para dúvidas ou sugestões, abra uma issue no repositório ou entre em contato.
