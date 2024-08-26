"use client";

import { Token } from "@/types/token";
import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";

import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, CellClickedEvent } from "ag-grid-community";

import { useRouter } from "next/navigation";
import { useSearchContext } from "@/app/context/SearchContext";
import { FavoriteCellRenderer, LogoCellRenderer } from "./CellRenderers/CellRenderers";


interface TokenGridProps {
  tokens: Token[];
}

const TokenGrid = ({ tokens }: TokenGridProps) => {
  const [favouritedTokens, setFavouritedTokens] = useState<{ chainId: number; address: string }[]>([]);
  const { searchTerm } = useSearchContext()
  const hasLoadedFromLocalStorage = useRef(false);
  const router = useRouter();

  // Check that window is available and then load favorited tokens from localStorage.
  useEffect(() => {
    if (typeof window !== "undefined" && !hasLoadedFromLocalStorage.current) {
      const savedFavourites = localStorage.getItem("favouritedTokens");
      if (savedFavourites) {
        setFavouritedTokens(JSON.parse(savedFavourites));
      }
      hasLoadedFromLocalStorage.current = true;
    }
  }, []);

  // Save the favourited tokens to localStorage whenever it changes.
  useEffect(() => {
    if (typeof window !== "undefined" && hasLoadedFromLocalStorage.current) {
      localStorage.setItem("favouritedTokens", JSON.stringify(favouritedTokens));
    }
  }, [favouritedTokens]);

  // Function to toggle the favorite state
  const toggleFavorite = useCallback((chainId: number, address: string) => {
    setFavouritedTokens(prevTokens => {
      const exists = prevTokens.some(token => token.chainId === chainId && token.address === address);
      if (exists) {
        return prevTokens.filter(token => !(token.chainId === chainId && token.address === address));
      } else {
        return [...prevTokens, { chainId, address }];
      }
    });
  }, []);

  // These functions work with Ag-grid to ensure that favourited tokens are pinned at the top of the grid. They filter through the 
  // tokens to check if/if not a favourited token's chainId and address (from localStorage) match a token's chainId and address.
  // useMemo is being used to improve efficientcy of app.

  const pinnedTopRowData = useMemo(() => {
    return tokens.filter(token => favouritedTokens.some(fav => fav.chainId === token.chainId && fav.address === token.address));
  }, [tokens, favouritedTokens]);

  const nonPinnedRowData = useMemo(() => {
    return tokens.filter(token => !favouritedTokens.some(fav => fav.chainId === token.chainId && fav.address === token.address));
  }, [tokens, favouritedTokens]);

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "",
        field: "isFavourited",
        cellRenderer: FavoriteCellRenderer,
        cellRendererParams: (params: CustomCellRendererProps) => {
          const isFavourited = favouritedTokens.some(
            fav => fav.chainId === params.data.chainId && fav.address === params.data.address
          );
          return {
            toggleFavorite,
            isFavourited,
          };
        },
        width: 75,
        pinned: "left",
        sortable: true,
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: "",
        field: "logoURI",
        cellRenderer: LogoCellRenderer,
        width: 75,
      },
      { headerName: "Name", field: "name", width: 300 },
      { headerName: "Address", field: "address", width: 450 },
      { headerName: "Chain ID", field: "chainId", width: 100 },
      { headerName: "Symbol", field: "symbol" },
      { headerName: "Decimals", field: "decimals", width: 100 },
      { headerName: "Price (USD)", field: "priceUSD" },
      { headerName: "Coin Key", field: "coinKey" },
    ],
    [toggleFavorite, favouritedTokens]
  );

  const onCellClicked = (event: CellClickedEvent) => {
    if (event.colDef.field !== "isFavourited") {
      router.push(`/details/${event.data.symbol}/${event.data.chainId}`);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="ag-theme-quartz-dark" style={{ height: "calc(85vh)" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={nonPinnedRowData}
          pinnedTopRowData={pinnedTopRowData}
          animateRows={true}
          rowSelection="single"
          onCellClicked={onCellClicked}
          defaultColDef={{ sortable: true }}
          quickFilterText={searchTerm}
          cacheQuickFilter={true}
        />
      </div>
    </div>
  );
};

export default TokenGrid;