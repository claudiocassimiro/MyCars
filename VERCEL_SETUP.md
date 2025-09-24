# Configuração do Vercel para MyCars

## Problema Identificado

A API funcionava localmente mas falhava no Vercel com erro 500 nas operações de escrita (POST, PUT, DELETE). Isso acontece porque o Vercel usa funções serverless com sistema de arquivos **somente leitura**.

## Solução Implementada

Foi implementado um sistema de persistência usando **Vercel KV** (Redis) que funciona perfeitamente no ambiente serverless do Vercel.

## Configuração Necessária

### 1. Instalar Vercel KV

```bash
npm install @vercel/kv
```

### 2. Configurar no Dashboard do Vercel

1. Acesse o dashboard do Vercel
2. Vá para o seu projeto
3. Navegue para **Storage** > **KV**
4. Crie um novo banco KV
5. Copie as variáveis de ambiente geradas

### 3. Adicionar Variáveis de Ambiente

No dashboard do Vercel, vá para **Settings** > **Environment Variables** e adicione:

```
KV_REST_API_URL=your_kv_rest_api_url
KV_REST_API_TOKEN=your_kv_rest_api_token
KV_REST_API_READ_ONLY_TOKEN=your_kv_rest_api_read_only_token
```

### 4. Deploy

Após configurar as variáveis de ambiente, faça o deploy novamente:

```bash
vercel --prod
```

## Arquivos Modificados

- `lib/veiculos-db.ts` - Novo sistema de persistência com Vercel KV
- `app/api/admin/veiculos/route.ts` - Atualizado para usar o novo sistema

## Funcionalidades

- ✅ GET - Listar veículos (funcionava antes)
- ✅ POST - Criar veículo (agora funciona no Vercel)
- ✅ PUT - Atualizar veículo (agora funciona no Vercel)
- ✅ DELETE - Deletar veículo (agora funciona no Vercel)

## Fallback

O sistema inclui fallback para dados locais caso o Vercel KV não esteja disponível, garantindo que a aplicação continue funcionando mesmo em caso de problemas de conectividade.
