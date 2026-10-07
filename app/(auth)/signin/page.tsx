import type { Metadata } from 'next';
import UserAuthForm from '@/components/forms/user-auth-form';
import { WalletCards } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Entrar | Finance Dashboard',
  description: 'Acesse seu painel financeiro.'
};

export default function AuthenticationPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-zinc-950 p-10 text-white lg:flex">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <WalletCards className="h-6 w-6" />
          Finance Dashboard
        </div>
        <div className="max-w-md">
          <h2 className="text-3xl font-semibold">Controle financeiro com dados claros.</h2>
          <p className="mt-3 text-sm text-zinc-300">
            Acompanhe receitas, despesas, saldo e evolução do fluxo de caixa em um único painel.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Acesse sua conta</h1>
            <p className="text-sm text-muted-foreground">
              Use e-mail e senha ou autenticação via GitHub.
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
