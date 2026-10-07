import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  demoTransactions,
  formatCurrency
} from '@/lib/finance';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function RecentSales() {
  const transactions = [...demoTransactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Movimentações recentes</CardTitle>
        <CardDescription>Últimas entradas e saídas do período.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {transactions.map((transaction) => {
          const income = transaction.type === 'income';
          const Icon = income ? ArrowUpRight : ArrowDownRight;

          return (
            <div key={transaction.id} className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {transaction.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {transaction.category} · {new Date(`${transaction.date}T12:00:00`).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="text-sm font-medium">
                {income ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
