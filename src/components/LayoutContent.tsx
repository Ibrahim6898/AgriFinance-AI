'use client';

import React from 'react';
import Navbar from './Navbar';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-slate-800">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
