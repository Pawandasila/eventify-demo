import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
}

export function PageContainer({ children, className, showFooter = true }: PageContainerProps) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className={cn("flex-1 w-full max-w-full", className)}>
        {children}
      </main>
      {showFooter && <Footer />}
      <CartDrawer />
    </div>
  );
}
