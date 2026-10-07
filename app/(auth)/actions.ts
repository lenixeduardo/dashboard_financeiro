'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as z from 'zod';
import { createClient } from '@/utils/supabase/server';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(128)
});

function parseCredentials(formData: FormData) {
  return authSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });
}

export async function login(formData: FormData) {
  const parsed = parseCredentials(formData);
  if (!parsed.success) {
    redirect('/signin?error=invalid_credentials');
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    redirect('/signin?error=authentication_failed');
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const parsed = parseCredentials(formData);
  if (!parsed.success) {
    redirect('/signin?error=invalid_credentials');
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signUp(parsed.data);

  if (error) {
    redirect('/signin?error=signup_failed');
  }

  redirect('/signin?message=check_email');
}
