'use client';

import { Token } from '@/types/token';
import { useState } from 'react';
import TokenGrid from '../TokenGrid/TokenGrid';

interface TokenOverviewProps {
  tokens: Token[];
}

const TokenOverview = ({ tokens }: TokenOverviewProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const flattenedTokens = Object.values(tokens).flat();

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
     <div className="flex flex-row justify-start items-center pt-4 pb-6 w-full bg-main">
        <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-100 mr-4 lg:mr-12">Token.io</h1>
        <input
            type="text"
            placeholder="Search Tokens"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <TokenGrid tokens={flattenedTokens} quickFilterText={searchTerm} />
    </div>
  );
};

export default TokenOverview;