import { ReactNode } from 'react';
type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>

      <div>{children}</div> {}

    </>
  );
}