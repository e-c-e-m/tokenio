import { CustomCellRendererProps } from "ag-grid-react";
import { pink } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";

export const FavoriteCellRenderer = (
  props: CustomCellRendererProps & {
    toggleFavorite: (chainId: number, address: string) => void;
    isFavourited: boolean;
  }
) => {
  const { toggleFavorite, data } = props;

  const isFavorited = props?.isFavourited;

  return (
    <button
      onClick={(e) => {
        toggleFavorite(data.chainId, data.address);
      }}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {isFavorited ? (
        <FavoriteIcon sx={{ color: pink[500] }} />
      ) : (
        <FavoriteBorderIcon />
      )}
    </button>
  );
};

export const LogoCellRenderer = (params: CustomCellRendererProps) => (
  <span className="flex items-center justify-start p-0.5">
    {params.value && (
      <Image alt="Token logo" src={params.value} height={35} width={35} />
    )}
  </span>
);
