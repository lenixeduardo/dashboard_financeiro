import { AreaGraph } from '@/components/charts/area-graph';
import { BarGraph } from '@/components/charts/bar-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { RecentSales } from '@/components/recent-sales';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  calculateSummary,
  demoTransactions,
  formatCurrency
} from '@/lib/finance';
import { ArrowDownRight, ArrowUpRight, PiggyBank, Wallet } from 'lucide-react';

export default function DashboardPage() {
  const summary = calculateSummary(demoTransactions);

  const cards = [
    {
      title: 'Receitas',
      value: formatCurrency(summary.income),
      detail: 'Total do período demonstrativo',
      Icon: ArrowUpRight
    },
    {
      title: 'Despesas',
      value: formatCurrency(summary.expenses),
      detail: 'Total do período demonstrativo',
      Icon: ArrowDownRight
    },
    {
      title: 'Saldo',
      value: formatCurrency(summary.balance),
      detail: 'Receitas menos despesas',
      Icon: Wallet
    },
    {
      title: 'Taxa de economia',
      value: `${summary.savingsRate.toFixed(1)}%`,
      detail: 'Percentual da renda preservado',
      Icon: PiggyBank
    }
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Visão financeira</h1>
          <p className="text-sm text-muted-foreground">
            Painel com dados demonstrativos centralizados no domínio financeiro.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ title, value, detail, Icon }) => (
            <Card key={title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <BarGraph />
          </div>
          <div className="lg:col-span-3">
            <RecentSales />
          </div>
          <div className="lg:col-span-4">
            <AreaGraph />
          </div>
          <div className="lg:col-span-3">
            <PieGraph />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
