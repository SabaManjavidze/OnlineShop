import type { UserCartProducts } from "@prisma/client";
import { Product } from "@prisma/client";

export const filterProducts = (
  products: UserCartProducts[],
  selected: number[],
  returnEmpty = false
) => {
  const isSelected = selected.length > 0;
  if (returnEmpty && !isSelected) return [];
  return isSelected
    ? products.filter((_, prodIdx) => prodIdx == selected[prodIdx])
    : products;
};
