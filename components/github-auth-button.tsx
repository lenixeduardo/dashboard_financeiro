'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from './ui/button';
import { Icons } from './icons';

export default function GithubSignInButton() {
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo }
    });

    if (error) {
      setLoading(false);
      window.location.href = '/signin?error=oauth_failed';
    }
  }

  return (
    <Button className="w-full" variant="outline" type="button" disabled={loading} onClick={handleSignIn}>
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Continuar com GitHub
    </Button>
  );
}
