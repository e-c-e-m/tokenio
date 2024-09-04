"use client";


import { useSearchContext } from "@/context/SearchContext";
import React from "react";

const TokenSearch = () => {
  const { searchTerm, setSearchTerm } = useSearchContext()

  return (
    <input
      type="text"
      placeholder="Search Tokens"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="block w-full p-4 ps-10 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export default TokenSearch;
