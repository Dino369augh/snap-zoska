"use client"; // This marks the component as a client component

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true); // Manage loading state

  useEffect(() => {
    if (status === 'loading') {
      return; // Don't redirect if still loading
    }

    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/prihlasenie');
    }

    // Set loading to false once status is determined
    setIsLoading(false);
  }, [status, router]);

  // Show loading spinner or message while waiting for session check
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or a nicer loading state
  }

  // Render the protected content after the session check
  return <>{children}</>;
};

export default AuthGuard;
