import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Novemcore AI Automation SaaS',
  description: 'A clean Novemcore wrapper for trusted workflow automation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
