'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '../game/contexts/UserContext';
import { useState } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <div className="flex flex-col items-center justify-center bg-red-500 h-screen w-screen">
          {children}
        </div>
      </UserProvider>
    </QueryClientProvider>
  );
} 