# Aplicação de Manutenção Comunitária

Uma aplicação web desenvolvida em React para conectar cidadãos, órgãos públicos e empresas na resolução de problemas urbanos de infraestrutura.

## 🎯 Sobre o Projeto

Esta aplicação permite que:
- **Cidadãos (Pessoas Físicas)**: Reportem problemas urbanos através de tickets
- **Empresas (Pessoas Jurídicas)**: Assumam e resolvam tickets disponíveis
- **Órgãos Públicos**: Monitorem e gerenciem as solicitações

## 🛠 Tecnologias Utilizadas

### Frontend
- **React 19.1.0** - Framework JavaScript
- **React Router DOM 7.6.0** - Roteamento
- **Material-UI 7.1.0** - Componentes UI
- **Emotion** - CSS-in-JS
- **Formik 2.4.6** - Gerenciamento de formulários
- **Yup 1.6.1** - Validação de esquemas
- **Axios 1.9.0** - Cliente HTTP
- **JWT Decode 4.0.0** - Decodificação de tokens

### Ferramentas de Desenvolvimento
- **Vite 6.3.5** - Build tool e dev server
- **ESLint** - Linting de código
- **CSS customizado** - Estilização

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Backend da aplicação** rodando na porta 5000

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd n708_front
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configuração do Backend

A aplicação está configurada para se conectar com o backend através de proxy no Vite. Verifique o arquivo `vite.config.js`:

```javascript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://192.168.5.87:5000', // Altere para o IP/URL do seu backend
      changeOrigin: true,
      secure: false
    },
    '/uploads': {
      target: 'http://192.168.5.87:5000',
      changeOrigin: true,
      secure: false
    }
  }
}
```

**Importante**: Altere o IP `192.168.5.87` para o endereço onde seu backend está rodando.

### 4. Configuração da API

No arquivo `src/services/api.js`, a URL base da API está definida como:
```javascript
export const API_BASE_URL = 'http://localhost:5000/api';
```

Se necessário, ajuste esta URL para corresponder ao seu backend.

## 🎮 Como Executar

### Desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
# ou
yarn build
```

### Preview da Build
```bash
npm run preview
# ou
yarn preview
```

### Linting
```bash
npm run lint
# ou
yarn lint
```

## 👥 Tipos de Usuário

### 1. Pessoa Física (Cidadão)
- **Função**: Criar tickets reportando problemas urbanos
- **Cadastro**: CPF + dados pessoais e endereço
- **Funcionalidades**:
  - Criar novos tickets
  - Visualizar seus tickets
  - Acompanhar status dos tickets
  - Deixar feedback quando o ticket for resolvido

### 2. Pessoa Jurídica (Empresa)
- **Função**: Assumir e resolver tickets
- **Cadastro**: CNPJ + dados da empresa e endereço
- **Funcionalidades**:
  - Visualizar tickets disponíveis
  - Assumir tickets
  - Marcar tickets como resolvidos
  - Ver histórico de tickets assumidos

## 🔐 Autenticação

A aplicação utiliza JWT (JSON Web Token) para autenticação:
- Token armazenado no `localStorage`
- Usuário logado armazenado no `localStorage`
- Logout limpa os dados do `localStorage`

## 📱 Interface e Navegação

### Rotas Públicas
- `/` - Página inicial
- `/login` - Login
- `/register` - Cadastro

### Rotas Protegidas (requer login)
- `/dashboard` - Dashboard principal
- `/create-ticket` - Criar ticket (apenas pessoas físicas)
- `/tickets/:id` - Detalhes do ticket

## 🎨 Estrutura de Componentes

```
src/
├── components/
│   └── Navbar.jsx         # Barra de navegação
├── pages/
│   ├── Home.jsx           # Página inicial
│   ├── Login.jsx          # Página de login
│   ├── Register.jsx       # Página de cadastro
│   ├── Dashboard.jsx      # Dashboard principal
│   ├── TicketForm.jsx     # Formulário de criação de ticket
│   ├── TicketDetail.jsx   # Detalhes do ticket
│   └── AvailableTickets.jsx # Tickets disponíveis (empresas)
├── services/
│   └── api.js             # Serviços de API
└── App.jsx                # Componente principal
```

## 📝 Funcionalidades Principais

### Para Pessoas Físicas
1. **Cadastro completo** com CPF e endereço
2. **Criação de tickets** com:
   - Título
   - Descrição
   - Endereço do problema
   - Upload de imagem (opcional)
3. **Acompanhamento de tickets** com status:
   - Aberto
   - Em andamento
   - Resolvido
4. **Feedback** após resolução

### Para Empresas
1. **Cadastro completo** com CNPJ e endereço
2. **Visualização de tickets disponíveis**
3. **Assumir tickets** (status muda para "em andamento")
4. **Finalizar tickets** (status muda para "resolvido")
5. **Histórico** de tickets assumidos

## 🔧 Configurações Importantes

### CEP Automático
O formulário de cadastro utiliza a API ViaCEP para preenchimento automático do endereço baseado no CEP.

### Upload de Imagens
- Suporte a upload de imagens nos tickets
- Preview da imagem antes do envio
- Formato aceito: qualquer tipo de imagem

### Responsividade
- Interface totalmente responsiva
- Suporte para dispositivos móveis
- Breakpoints para diferentes tamanhos de tela

## 🐛 Solução de Problemas Comuns

### 1. Erro de Conexão com Backend
```
Verifique se:
- O backend está rodando na porta correta
- O IP no vite.config.js está correto
- Não há firewall bloqueando a conexão
```

### 2. Problemas com Upload de Imagem
```
Verifique se:
- O backend suporta multipart/form-data
- O endpoint /api/tickets aceita POST com FormData
- Há espaço suficiente para upload
```

### 3. Erro de CORS
```
Certifique-se de que o backend tem CORS configurado para aceitar
requisições da origem http://localhost:5173
```

## 📚 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa linting do código

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env` se precisar customizar configurações:

```env
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```

## 📄 Licença

Este projeto é privado e destinado para uso educacional/demonstrativo.

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.

---

**Observação**: Este README assume que você possui um backend compatível rodando. Certifique-se de que todas as rotas de API mencionadas no código estão implementadas no seu backend.
