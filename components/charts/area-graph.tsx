'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
import { demoTransactions, monthlyCashFlow } from '@/lib/finance';

const flow = monthlyCashFlow(demoTransactions);
let runningBalance = 0;
const chartData = flow.map((item) => {
  runningBalance += item.net;
  return { ...item, balance: runningBalance };
});

const chartConfig = {
  balance: {
    label: 'Saldo acumulado',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução do saldo</CardTitle>
        <CardDescription>Saldo acumulado ao longo dos meses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={64} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="balance"
              fill="var(--color-balance)"
              fillOpacity={0.3}
              stroke="var(--color-balance)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
