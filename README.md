# AutoVenda - Sistema de Catálogo de Veículos

Sistema completo de catálogo de veículos seminovos com interface administrativa para gerenciamento de produtos.

## 🚗 Funcionalidades

### Para Visitantes

- **Catálogo de Veículos**: Visualização de todos os veículos disponíveis
- **Filtros Avançados**: Busca por marca, modelo, ano, preço, cor, combustível, câmbio
- **Detalhes Completos**: Página individual para cada veículo com galeria de fotos
- **Contato Direto**: Botões para WhatsApp e telefone
- **Design Responsivo**: Interface otimizada para desktop e mobile

### Para Administradores

- **CRUD Completo**: Adicionar, editar e excluir veículos
- **Interface Intuitiva**: Painel administrativo fácil de usar
- **Persistência Local**: Dados salvos no localStorage do navegador
- **Validação de Dados**: Campos obrigatórios e validação de tipos

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **LocalStorage** - Persistência de dados

## 📋 Estrutura do Projeto

```
├── app/
│   ├── admin/                 # Interface administrativa
│   ├── catalogo/             # Página do catálogo
│   ├── veiculo/[id]/         # Página de detalhes do veículo
│   └── page.tsx              # Página inicial
├── components/
│   ├── veiculo-card.tsx      # Card do veículo
│   ├── header.tsx            # Cabeçalho
│   └── footer.tsx            # Rodapé
├── data/
│   └── veiculos.json         # Dados iniciais dos veículos
└── lib/
    └── data.ts               # Funções de manipulação de dados
```

## 🚀 Como Executar

1. **Instalar dependências:**

```bash
npm install
```

2. **Executar em modo desenvolvimento:**

```bash
npm run dev
```

3. **Abrir no navegador:**

```
http://localhost:3000
```

## 📱 Páginas Disponíveis

- **/** - Página inicial com veículos em destaque
- **/catalogo** - Catálogo completo com filtros
- **/veiculo/[id]** - Detalhes de um veículo específico
- **/admin** - Painel administrativo (CRUD de veículos)

## 🎨 Tema e Design

- **Cores**: Azul, prata e branco
- **Tipografia**: Geist Sans
- **Layout**: Responsivo e moderno
- **Acessibilidade**: Componentes Radix UI com foco em acessibilidade

## 📊 Dados dos Veículos

Cada veículo contém:

- Informações básicas (marca, modelo, ano, preço)
- Características técnicas (motor, potência, consumo)
- Detalhes físicos (cor, portas, quilometragem)
- Opcionais e equipamentos
- Informações de contato
- Status (disponível, vendido, reservado)
- Tabela FIPE
- Chave reserva (sim/não)

## 🔧 Funcionalidades Administrativas

- **Adicionar Veículo**: Formulário completo com validação
- **Editar Veículo**: Modificar informações existentes
- **Excluir Veículo**: Remoção com confirmação
- **Filtros**: Busca e filtros na lista de veículos
- **Persistência**: Dados salvos automaticamente no localStorage

## 📝 Próximas Melhorias

- [ ] Upload de imagens
- [ ] Integração com banco de dados
- [ ] Sistema de autenticação
- [ ] Relatórios de vendas
- [ ] Notificações por email
- [ ] API REST para integração
