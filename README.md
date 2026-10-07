# Finance Dashboard

Dashboard financeiro em Next.js com autenticação Supabase e visualização de fluxo de caixa.

## Stack

- Next.js 14 + TypeScript
- Supabase Auth
- Tailwind CSS + shadcn/ui
- Recharts
- Zod + React Hook Form

## Funcionalidades atuais

- autenticação por e-mail/senha via Supabase;
- OAuth GitHub via Supabase;
- middleware com renovação de sessão;
- resumo de receitas, despesas, saldo e taxa de economia;
- fluxo de caixa mensal;
- evolução de saldo;
- despesas por categoria;
- lista de movimentações recentes.

Os valores financeiros presentes no dashboard são um conjunto demonstrativo centralizado em `lib/finance.ts`. Eles não são apresentados como dados reais de uma conta bancária.

## Configuração

Crie `.env.local` a partir de `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Depois:

```bash
npm ci
npm run dev
```

## Qualidade

```bash
npm run lint
npm run build
```

O próximo passo de produto é persistir movimentações financeiras por usuário no Postgres/Supabase com RLS, substituindo o conjunto demonstrativo sem alterar os componentes de domínio.
