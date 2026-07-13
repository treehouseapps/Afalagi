import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Afalagi',
  description: 'Find medicines and nearby pharmacies',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
