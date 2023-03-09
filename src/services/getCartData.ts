import verifyCookie from "./verifyCookie";
import { getRequest } from "./api";
import { Cart } from "../Types";
import setApiHeaders from "./setApiHeaders";

type GetCartDataReturn = {
  data: Cart | null;
  quantity: number;
};

export default async function getCartData(): Promise<GetCartDataReturn> {
  if (!verifyCookie()) return { data: null, quantity: 0 };

  try {
    setApiHeaders();
    const { data, status } = await getRequest<Cart>("/cart");

    if (status !== 200) return { data: null, quantity: 0 };

    return {
      data,
      quantity: data.cartPizzas.length,
    };
  } catch (error) {
    return { data: null, quantity: 0 };
  }
}
