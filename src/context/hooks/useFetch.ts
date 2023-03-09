import { useEffect, useState } from "react";
import getCartData from "../../services/getCartData";
import getUser from "../../services/getUser";
import { User } from "../../Types";

export default function useFetch() {
  const [user, setUser] = useState<User | null>(null);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    async function initialRequests() {
      const { quantity } = await getCartData();
      setCartQuantity(quantity);

      const { data } = await getUser();
      setUser(data);
    }
    initialRequests();
  }, []);

  return { user, setUser, cartQuantity, setCartQuantity };
}
