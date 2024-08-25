"use client";

import { Token } from "@/types/token";
import React from "react";
import { pink } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";

interface TokenDetailsProps {
  token: Token;
}

const TokenDetails = ({ token }: TokenDetailsProps) => {
  const isFavourited = true;
  const router = useRouter();

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
        <button className="h-min flex flex-row items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          {isFavourited ? (
            <FavoriteIcon sx={{ color: pink[500] }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </button>
      </div>
      <div className="p-2 divide-y w-6/12">
        <div className="p-2">
          <p className="font-semibold text-stone-400 text-2xl">Symbol</p>
          <span className="text-neutral-100 text-lg hover:text-neutral-300 hover:cursor-pointer">
            {token.symbol}
          </span>
        </div>
        <div className="p-2">
          <p className="font-semibold text-stone-400 text-2xl">Chain Id</p>
          <p className="text-neutral-100 text-lg">{token.chainId}</p>
        </div>
        <div className="p-2">
          <p className="font-semibold text-stone-400 text-2xl">Address</p>
          <p className="text-neutral-100 text-lg">{token.address}</p>
        </div>
        <div className="p-2">
          <p className="font-semibold text-stone-400 text-2xl">Price USD</p>
          <p className="text-neutral-100 text-lg">{token.priceUSD}</p>
        </div>
        <div className="p-2">
          <p className="font-semibold text-stone-400 text-2xl">Decimals</p>
          <p className="text-neutral-100 text-lg">{token.decimals}</p>
        </div>
        <div className="p-2">
          <p className="font-semibold text-stone-400 text-2xl">Coin Key</p>
          <p className="text-neutral-100 text-lg">{token.coinKey}</p>
        </div>
      </div>
      <button
        className="h-min flex flex-row items-center mt-4 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() => router.push(`/`)}
      >
        <ArrowBackIosNewIcon className="mr-2" />
        GO BACK
      </button>
    </div>
  );
};

export default TokenDetails;
