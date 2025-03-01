'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@libs/static/Logo';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();

  const handleHome = () => {
    router.push('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-primary-bg-1 shadow-lg z-40">
      <div className="max-w-2xl mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex items-center gap-6">
          <div
            className="w-12 h-12 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={handleHome}
          >
            <Logo />
          </div>
          <div className="text-lg font-semibold text-primary-font-1">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
