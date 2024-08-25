"use client";

import { useSearchContext } from "@/app/context/SearchContext";
import React from "react";

const TokenSearch = () => {
  const { searchTerm, setSearchTerm } = useSearchContext()

  return (
    <input
      type="text"
      placeholder="Search Tokens"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  );
};

export default TokenSearch;
