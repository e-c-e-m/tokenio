import { Token } from "@/types/token";
import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";

import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, CellClickedEvent } from "ag-grid-community";
import Image from "next/image";
import { pink } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";

interface TokenGridProps {
  tokens: Token[];
  quickFilterText: string;
}

const FavoriteCellRenderer = (
  props: CustomCellRendererProps & { toggleFavorite: (chainId: number, address: string) => void, isFavourited: boolean }
) => {
  const { toggleFavorite, data } = props;

  // Determine if the current token is favorited based on the passed props
  const isFavorited = props?.isFavourited;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent row click event
        toggleFavorite(data.chainId, data.address);
      }}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {isFavorited ? <FavoriteIcon sx={{ color: pink[500] }} /> : <FavoriteBorderIcon />}
    </button>
  );
};

const LogoCellRenderer = (params: CustomCellRendererProps) => (
  <span className="flex items-center justify-start p-0.5">
    {params.value && <Image alt="Token logo" src={params.value} height={35} width={35} />}
  </span>
);

const TokenGrid = ({ tokens, quickFilterText }: TokenGridProps) => {
  const [favoritedTokens, setFavoritedTokens] = useState<{ chainId: number; address: string }[]>([]);
  const hasLoadedFromLocalStorage = useRef(false);
  const router = useRouter();

  // Load favorited tokens from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && !hasLoadedFromLocalStorage.current) {
      const savedFavorites = localStorage.getItem("favouritedTokens");
      console.log("Loaded from localStorage:", savedFavorites);
      if (savedFavorites) {
        setFavoritedTokens(JSON.parse(savedFavorites));
      }
      hasLoadedFromLocalStorage.current = true;
    }
  }, []);

  // Save the favorited tokens to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && hasLoadedFromLocalStorage.current) {
      console.log("Saving to localStorage:", favoritedTokens);
      localStorage.setItem("favouritedTokens", JSON.stringify(favoritedTokens));
    }
  }, [favoritedTokens]);

  // Function to toggle the favorite state
  const toggleFavorite = useCallback((chainId: number, address: string) => {
    setFavoritedTokens(prevTokens => {
      const exists = prevTokens.some(token => token.chainId === chainId && token.address === address);
      if (exists) {
        console.log("Removing from favorites:", { chainId, address });
        return prevTokens.filter(token => !(token.chainId === chainId && token.address === address));
      } else {
        console.log("Adding to favorites:", { chainId, address });
        return [...prevTokens, { chainId, address }];
      }
    });
  }, []);

  // Prepare the data to be displayed and pinned
  const pinnedTopRowData = useMemo(() => {
    return tokens.filter(token => favoritedTokens.some(fav => fav.chainId === token.chainId && fav.address === token.address));
  }, [tokens, favoritedTokens]);

  const nonPinnedRowData = useMemo(() => {
    return tokens.filter(token => !favoritedTokens.some(fav => fav.chainId === token.chainId && fav.address === token.address));
  }, [tokens, favoritedTokens]);

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "",
        field: "isFavourited",
        cellRenderer: FavoriteCellRenderer,
        cellRendererParams: (params: CustomCellRendererProps) => {
          const isFavourited = favoritedTokens.some(
            fav => fav.chainId === params.data.chainId && fav.address === params.data.address
          );
          console.log("isFavorited:", isFavourited, "for", params.data);
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
    [toggleFavorite, favoritedTokens]
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
          quickFilterText={quickFilterText}
          cacheQuickFilter={true}
        />
      </div>
    </div>
  );
};

export default TokenGrid;