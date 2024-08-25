import { Token } from "@/types/token";
import React from "react";

import { AgGridReact, CustomCellRendererProps } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef, RowClickedEvent, CellClickedEvent } from "ag-grid-community";
import Image from "next/image";
import { pink } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TokenListProps {
  tokens: Token[];
  favorites: string[];
  onFavoriteToggle: (tokenAddress: string) => void;
}

const FavoriteCellRenderer = (props: CustomCellRendererProps) => {
  const isFavorited = props.value;

  return (
    <button
      onClick={() => props.context.onFavoriteToggle(props.data.chainId + props.data.address)}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {isFavorited ? <FavoriteIcon sx={{ color: pink[500] }}/> : <FavoriteBorderIcon />}
    </button>
  );
};

const LogoCellRenderer = (params: CustomCellRendererProps) => (
  <span className="flex items-center justify-start p-0.5">
    {params.value && (
      <Image
        alt="Token logo"
        src={params.value}
        height={35}
        width={35}
      />
    )}
  </span>
);

const TokenList = ({ tokens }: TokenListProps) => {
  const router = useRouter()
  
  const columnDefs: ColDef[] = [
    {
      headerName: "",
      field: "isFavourited",
      cellRenderer: FavoriteCellRenderer,
      width: 75,
      pinned: "left",
      sortable: false,
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
  ];

  const onRowClicked = (event: CellClickedEvent) => {
    if (event.value !== undefined) {
      router.push(`/details/${event.data.symbol}/${event.data.chainId}`)
    }
  }

  return (
    <div className="w-full h-full">
      <div className="ag-theme-quartz-dark" style={{ height: "calc(85vh)" }}>
        <AgGridReact 
        columnDefs={columnDefs} 
        rowData={tokens} 
        animateRows={true}
        rowSelection="single"
        onCellClicked={onRowClicked}
        />
      </div>
    </div>
  );
};

export default TokenList;
