import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCheckout } from "../hooks/useCheckoutHooks";
import { api } from "../utils/api";
import { ClipLoader } from "react-spinners";
import { IoCloseCircle } from "react-icons/io5";

type CategoryCardPropType = {
  href: string;
  title: string;
  description: string;
  price: number;
  src: string;
  quantity: number;
  productId: string;
};
const CartProductCard = ({
  href,
  title,
  src,
  description,
  price,
  quantity,
  productId,
}: CategoryCardPropType) => {
  const { handleChangeQuantity, selected, setSelected } = useCheckout();
  const utils = api.useContext();

  const { mutateAsync: removeCartProduct, isLoading: removeProductLoading } =
    api.cart.removeProductFromCart.useMutation({
      onSuccess() {
        utils.cart.getCart.invalidate();
      },
    });

  const handleRemoveCartProduct = async (prodId: string) => {
    setSelected(selected.filter((id) => id !== prodId));
    await removeCartProduct({ productId: prodId });
  };
  return (
    <div className="items-strech border-t border-gray-50 py-8 md:flex md:py-10 lg:py-8">
      <div className="relative w-full md:w-4/12 2xl:w-1/4">
        <Link href={href}>
          <Image
            src={src}
            fill
            alt="Black Leather Bag"
            className="hidden h-full object-cover object-center md:block"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-center md:w-8/12 md:pl-3 2xl:w-3/4">
        <div className="flex w-full items-center justify-between pt-1">
          <p className="text-xl font-black leading-none text-gray-800 dark:text-white">
            {title}
          </p>
          <button
            className="cursor-pointer pr-5 text-xs leading-3 text-red-500 underline duration-150 hover:scale-105"
            onClick={() => handleRemoveCartProduct(productId)}
            title="Remove Product"
          >
            {removeProductLoading ? (
              <ClipLoader color="white" />
            ) : (
              <IoCloseCircle size={30} className="text-red-500" />
            )}
          </button>
        </div>
        <p className="py-4 text-lg leading-3 text-gray-600 dark:text-white">
          Size: Xl
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: description }}
          className="text-md mt-4 w-3/4 leading-5 text-gray-600 dark:text-white"
        ></p>
        <div className="flex items-center justify-between pt-5">
          <div className="flex items-center">
            <input
              className="mr-6 w-10 border-none bg-skin-secondary py-2 px-1 outline-none"
              value={quantity}
              type="number"
              onChange={(e) => {
                handleChangeQuantity(
                  productId,
                  parseInt(e.currentTarget.value)
                );
              }}
            />
            <p className="text-lg leading-none text-gray-800 dark:text-white">
              Quantity
            </p>
          </div>
          <p className="text-base font-black leading-none text-gray-800 dark:text-white">
            ${quantity * price}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CartProductCard;
