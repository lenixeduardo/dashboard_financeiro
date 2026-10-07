'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { demoTransactions, expenseByCategory, formatCurrency } from '@/lib/finance';

const palette = [
  'var(--color-moradia)',
  'var(--color-alimentacao)',
  'var(--color-transporte)',
  'var(--color-lazer)',
  'var(--color-servicos)'
];

const categoryKeys: Record<string, string> = {
  Moradia: 'moradia',
  Alimentação: 'alimentacao',
  Transporte: 'transporte',
  Lazer: 'lazer',
  Serviços: 'servicos'
};

const chartData = expenseByCategory(demoTransactions).map((item, index) => ({
  ...item,
  key: categoryKeys[item.category] ?? 'servicos',
  fill: palette[index % palette.length]
}));

const chartConfig = {
  value: { label: 'Despesas' },
  moradia: { label: 'Moradia', color: 'hsl(var(--chart-1))' },
  alimentacao: { label: 'Alimentação', color: 'hsl(var(--chart-2))' },
  transporte: { label: 'Transporte', color: 'hsl(var(--chart-3))' },
  lazer: { label: 'Lazer', color: 'hsl(var(--chart-4))' },
  servicos: { label: 'Serviços', color: 'hsl(var(--chart-5))' }
} satisfies ChartConfig;

export function PieGraph() {
  const total = React.useMemo(
    () => chartData.reduce((sum, item) => sum + item.value, 0),
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Despesas por categoria</CardTitle>
        <CardDescription>Distribuição das saídas registradas.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="key" innerRadius={64} strokeWidth={4}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-lg font-bold"
                      >
                        {formatCurrency(total)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 22}
                        className="fill-muted-foreground text-xs"
                      >
                        despesas
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
