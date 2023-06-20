import React, { useState } from 'react';
import Head from 'next/head';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <>
    <Head>
      <title>{title ? `${title} - Chat App` : 'Chat App'}</title>
    </Head>
    <div className={`min-h-screen ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <header className="p-4 border-b flex items-center justify-between">
        <h1 className="font-semibold text-xl">{title || 'Chat App'}</h1>
        <button
          className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white p-2 rounded"
          onClick={toggleTheme}
        >
          {isDark ? 'Light Theme' : 'Dark Theme'}
        </button>
      </header>
      <main className="p-4">{children}</main>
    </div>
  </>
);
};

export default Layout;
