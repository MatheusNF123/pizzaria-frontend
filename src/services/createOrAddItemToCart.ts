import { NextRouter } from "next/router";

import { getRequest, postRequest } from "./api";
import setApiHeaders from "./setApiHeaders";
import { PurchaseItem, Cart, ApiReturnMessage } from "../Types";

export default async function createOrAddItemToCart(
  item: PurchaseItem,
  router: NextRouter
) {
  setApiHeaders();
  try {
    const { data, status } = await getRequest<Cart>("/cart");

    if (status === 401) return router.push("/login");

    if (status === 409) {
      return await postRequest<ApiReturnMessage>("/cart", { pizzas: [item] });
    }

    if (status === 200) {
      return await postRequest<ApiReturnMessage>("/cart/item", {
        cartId: data.id,
        item,
      });
    }
  } catch (error) {
    return;
  }
}
