'use client';

import Link from 'next/link';
import { Suspense } from 'react';

export default function NotFound() {
  return (
    <Suspense fallback={null}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl">Page not found</p>
          <Link 
            href="/"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
          >
            Return Home
          </Link>
        </div>
      </div>
    </Suspense>
  );
}