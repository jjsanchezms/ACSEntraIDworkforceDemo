import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AuthProvider } from './types';

interface LoginButtonsProps {
  onLogin: (provider: AuthProvider) => void;
  isLoading: string | null;
}

export function LoginButtons({ onLogin, isLoading }: LoginButtonsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Providers</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 justify-center">
        <Button
          onClick={() => onLogin('Fabrikam')}
          disabled={isLoading !== null}
          className="min-w-[200px]"
        >
          {isLoading === 'Fabrikam' ? 'Authenticating...' : 'Login with Fabrikam'}
        </Button>
        <Button
          onClick={() => onLogin('Contoso')}
          disabled={isLoading !== null}
          variant="secondary"
          className="min-w-[200px]"
        >
          {isLoading === 'Contoso' ? 'Authenticating...' : 'Login with Contoso'}
        </Button>
      </CardContent>
    </Card>
  );
}