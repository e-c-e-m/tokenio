"use client";

import { Token } from "@/types/token";
import React, { useState, useEffect, useCallback } from "react";
import { pink } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import SlotCounter from 'react-slot-counter';

interface TokenDetailsProps {
  token: Token;
}

const TokenDetails = ({ token }: TokenDetailsProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const router = useRouter();

  // Check if the token is favorited on component mount
  useEffect(() => {
    const favoritedTokens = JSON.parse(localStorage.getItem("favouritedTokens") || "[]");
    const isFavoritedToken = favoritedTokens.some(
      (fav: { chainId: number; address: string }) =>
        fav.chainId === token.chainId && fav.address === token.address
    );
    setIsFavorited(isFavoritedToken);
  }, [token.chainId, token.address]);

  // Toggle favorite state and update localStorage
  const toggleFavorite = useCallback(() => {
    setIsFavorited(prevState => {
      const favoritedTokens = JSON.parse(localStorage.getItem("favouritedTokens") || "[]");
      let updatedFavorites;
      
      if (prevState) {
        // Remove from favorites
        updatedFavorites = favoritedTokens.filter(
          (fav: { chainId: number; address: string }) =>
            !(fav.chainId === token.chainId && fav.address === token.address)
        );
      } else {
        // Add to favorites
        updatedFavorites = [...favoritedTokens, { chainId: token.chainId, address: token.address }];
      }
      
      localStorage.setItem("favouritedTokens", JSON.stringify(updatedFavorites));
      return !prevState;
    });
  }, [token.chainId, token.address]);

  return (
    <div className="flex flex-col items-start w-full h-full overflow-hidden">
      <h1 className="font-mono text-6xl font-extrabold text-neutral-100 pt-4 pb-6">
        Token.io
      </h1>
      <div className="p-2 flex flex-row items-center">
        {token.logoURI && (
          <Image
            alt="Token logo"
            src={token.logoURI}
            className="mr-4"
            height={55}
            width={55}
          />
        )}
        <h2 className="font-mono text-5xl font-extrabold text-indigo-400 mr-4">
          {token.name}
        </h2>
        <button
          className="h-min flex flex-row items-center border focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
          onClick={toggleFavorite}
        >
          {isFavorited ? (
            <FavoriteIcon sx={{ color: pink[500] }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </button>
      </div>
      <div className="p-2 w-full lg:w-6/12">
        <div className="p-2 bg-secondary border-2 border-gray-600 rounded-md mb-4 overflow-x-scroll">
          <p className="font-semibold text-stone-400 text-2xl">Symbol</p>
          <p className="text-neutral-100 text-lg">{token.symbol}</p>
        </div>
        <div className="p-2 bg-secondary border-2 border-gray-600 rounded-md mb-4 overflow-x-scroll">
          <p className="font-semibold text-stone-400 text-2xl">Chain Id</p>
          <p className="text-neutral-100 text-lg">{token.chainId}</p>
        </div>
        <div className="p-2 bg-secondary border-2 border-gray-600 rounded-md mb-4 overflow-x-scroll">
          <p className="font-semibold text-stone-400 text-2xl">Address</p>
          <p className="text-neutral-100 text-lg">{token.address}</p>
        </div>
        <div className="p-2 bg-secondary border-2 border-gray-600 rounded-md mb-4 overflow-x-scroll">
          <p className="font-semibold text-stone-400 text-2xl">Price USD</p>
          <p className="text-neutral-100 text-lg"><SlotCounter value={token.priceUSD} /></p>
        </div>
        <div className="p-2 bg-secondary border-2 border-gray-600 rounded-md mb-4 overflow-x-scroll">
          <p className="font-semibold text-stone-400 text-2xl">Decimals</p>
          <p className="text-neutral-100 text-lg">{token.decimals}</p>
        </div>
        <div className="p-2 bg-secondary border-2 border-gray-600 rounded-md overflow-x-scroll">
          <p className="font-semibold text-stone-400 text-2xl">Coin Key</p>
          <p className="text-neutral-100 text-lg">{token.coinKey}</p>
        </div>
      </div>
      <button
        className="h-min flex flex-row items-center mt-4 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
        onClick={() => router.push(`/`)}
      >
        <ArrowBackIosNewIcon className="mr-2" />
        GO BACK
      </button>
    </div>
  );
};

export default TokenDetails;
