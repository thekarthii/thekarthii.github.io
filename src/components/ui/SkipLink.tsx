'use client';

import { useState } from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SkipLink({ href, children }: SkipLinkProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <a
      href={href}
      className={`
        fixed top-4 left-4 z-[100]
        px-4 py-2 rounded-md
        bg-circuit-copper text-circuit-dark
        font-semibold text-sm
        transition-transform duration-200
        focus:outline-none focus:ring-2 focus:ring-circuit-glow
        ${isFocused ? 'translate-y-0' : '-translate-y-20'}
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {children}
    </a>
  );
}

export default SkipLink;
