export type TransactionType = 'income' | 'expense';

export type FinancialTransaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  type: TransactionType;
  amount: number;
};

export const demoTransactions: FinancialTransaction[] = [
  { id: '1', date: '2026-05-05', description: 'Salário', category: 'Renda', type: 'income', amount: 7200 },
  { id: '2', date: '2026-05-08', description: 'Aluguel', category: 'Moradia', type: 'expense', amount: 1800 },
  { id: '3', date: '2026-05-12', description: 'Mercado', category: 'Alimentação', type: 'expense', amount: 620 },
  { id: '4', date: '2026-06-05', description: 'Salário', category: 'Renda', type: 'income', amount: 7200 },
  { id: '5', date: '2026-06-10', description: 'Freelance', category: 'Renda extra', type: 'income', amount: 900 },
  { id: '6', date: '2026-06-11', description: 'Aluguel', category: 'Moradia', type: 'expense', amount: 1800 },
  { id: '7', date: '2026-06-16', description: 'Transporte', category: 'Transporte', type: 'expense', amount: 480 },
  { id: '8', date: '2026-07-05', description: 'Salário', category: 'Renda', type: 'income', amount: 7200 },
  { id: '9', date: '2026-07-09', description: 'Mercado', category: 'Alimentação', type: 'expense', amount: 710 },
  { id: '10', date: '2026-07-21', description: 'Streaming e apps', category: 'Serviços', type: 'expense', amount: 185 },
  { id: '11', date: '2026-08-05', description: 'Salário', category: 'Renda', type: 'income', amount: 7200 },
  { id: '12', date: '2026-08-14', description: 'Aluguel', category: 'Moradia', type: 'expense', amount: 1800 },
  { id: '13', date: '2026-08-20', description: 'Restaurantes', category: 'Lazer', type: 'expense', amount: 520 },
  { id: '14', date: '2026-09-05', description: 'Salário', category: 'Renda', type: 'income', amount: 7200 },
  { id: '15', date: '2026-09-11', description: 'Freelance', category: 'Renda extra', type: 'income', amount: 1200 },
  { id: '16', date: '2026-09-13', description: 'Mercado', category: 'Alimentação', type: 'expense', amount: 690 },
  { id: '17', date: '2026-10-05', description: 'Salário', category: 'Renda', type: 'income', amount: 7200 },
  { id: '18', date: '2026-10-06', description: 'Freelance', category: 'Renda extra', type: 'income', amount: 1800 },
  { id: '19', date: '2026-10-06', description: 'Aluguel', category: 'Moradia', type: 'expense', amount: 1800 },
  { id: '20', date: '2026-10-07', description: 'Mercado', category: 'Alimentação', type: 'expense', amount: 760 },
  { id: '21', date: '2026-10-07', description: 'Transporte', category: 'Transporte', type: 'expense', amount: 510 }
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function calculateSummary(transactions: FinancialTransaction[]) {
  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + item.amount, 0);
  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? (balance / income) * 100 : 0;

  return { income, expenses, balance, savingsRate };
}

export function monthlyCashFlow(transactions: FinancialTransaction[]) {
  const byMonth = new Map<string, { income: number; expense: number }>();

  for (const item of transactions) {
    const month = item.date.slice(0, 7);
    const current = byMonth.get(month) ?? { income: 0, expense: 0 };
    current[item.type] += item.amount;
    byMonth.set(month, current);
  }

  return Array.from(byMonth.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, values]) => {
      const [year, monthNumber] = month.split('-').map(Number);
      const label = new Intl.DateTimeFormat('pt-BR', { month: 'short' })
        .format(new Date(year, monthNumber - 1, 1))
        .replace('.', '');
      return {
        month,
        label,
        income: values.income,
        expense: values.expense,
        net: values.income - values.expense
      };
    });
}

export function expenseByCategory(transactions: FinancialTransaction[]) {
  const categories = new Map<string, number>();

  for (const item of transactions) {
    if (item.type !== 'expense') continue;
    categories.set(item.category, (categories.get(item.category) ?? 0) + item.amount);
  }

  return Array.from(categories.entries())
    .map(([category, value]) => ({ category, value }))
    .sort((a, b) => b.value - a.value);
}
