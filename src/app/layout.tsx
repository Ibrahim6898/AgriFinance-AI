import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'AgriFinance AI',
  description: 'AI-powered microfinance platform for smallholder farmers.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-slate-800">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
