'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login, signup } from '../../app/(auth)/actions';
import GithubSignInButton from '../github-auth-button';

const formSchema = z.object({
  email: z.string().email({ message: 'Informe um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' }
  });

  async function submit(data: UserFormValue, mode: 'login' | 'signup') {
    setLoading(true);
    const formData = new FormData();
    formData.set('email', data.email);
    formData.set('password', data.password);

    if (mode === 'signup') {
      await signup(formData);
      return;
    }

    await login(formData);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => submit(data, 'login'))} className="w-full space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" placeholder="voce@exemplo.com" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="current-password" placeholder="Sua senha" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="w-full" type="submit">
            Entrar
          </Button>
          <Button
            disabled={loading}
            className="w-full"
            type="button"
            variant="outline"
            onClick={form.handleSubmit((data) => submit(data, 'signup'))}
          >
            Criar conta
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">ou</span>
        </div>
      </div>
      <GithubSignInButton />
    </>
  );
}
