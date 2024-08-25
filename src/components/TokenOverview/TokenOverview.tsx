// components/TokenOverview.tsx
'use client';

import { Token } from '@/types/token';
import { useState, useEffect } from 'react';
import TokenList from '../TokenList/TokenList';

interface TokenOverviewProps {
  tokens: Token[];
}

const TokenOverview = ({ tokens }: TokenOverviewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Flatten the tokens from the API response
  const flattenedTokens = Object.values(tokens).flat();

  // Filter the tokens based on the search term
  const filteredTokens = flattenedTokens.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavoriteToggle = (tokenAddress: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(tokenAddress)
        ? prevFavorites.filter((fav) => fav !== tokenAddress)
        : [...prevFavorites, tokenAddress]
    );
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
     <div className="flex flex-row justify-start items-center pt-4 pb-6 w-full bg-main">
        <h1 className="font-mono text-6xl font-extrabold text-neutral-100 mr-12">Token.io</h1>
        <input
            type="text"
            placeholder="Search Tokens"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <TokenList tokens={filteredTokens} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />
    </div>
  );
};

export default TokenOverview;