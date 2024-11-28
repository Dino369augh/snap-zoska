import { ReactNode } from 'react';
import AuthGuard from '../../components/AuthGuard'; // Import the AuthGuard component

type PrivateLayoutProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <AuthGuard>
      <div>{children}</div> {/* Render the children (protected content) */}
    </AuthGuard>
  );
}
