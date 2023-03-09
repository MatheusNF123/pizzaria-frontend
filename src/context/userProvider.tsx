import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie } from "nookies";

import { User, PurchaseItem } from "../Types";
import createOrAddItemToCart from "../services/createOrAddItemToCart";
import verifyCookie from "../services/verifyCookie";
import getCartData from "../services/getCartData";
import getUser from "../services/getUser";
import useFetch from "./hooks/useFetch";

type UserContextValues = {
  user: User | null;
  cartQuantity: number;
  menuOptions: { option: string; endPoint: string }[];
  handleUser: (user: User) => void;
  handleLogin: (user: User) => Promise<void>;
  handleLogout: () => void;
  handleCartQuantity: (quantity: number) => void;
  handlePurchase: (item: PurchaseItem) => void;
};

export const userContext = createContext({} as UserContextValues);

type UserProviderProps = {
  children: ReactNode;
};

const adminMenu = [
  { option: "Meu perfil", endPoint: "/user/perfil" },
  { option: "Meus pedidos", endPoint: "/user/meus_pedidos" },
  { option: "Usuários", endPoint: "/admin/usuarios" },
  { option: "Pizzas", endPoint: "/admin/pizzas" },
  { option: "Sair", endPoint: "/pizzas" },
];

const customerMenu = [
  { option: "Meu perfil", endPoint: "/user/perfil" },
  { option: "Meus pedidos", endPoint: "/user/meus_pedidos" },
  { option: "Sair", endPoint: "/pizzas" },
];

const loggedOutMenu = [{ option: "Login", endPoint: "/login" }];

// const initialMenuOptions = verifyCookie() ? customerMenu : loggedOutMenu;

export default function UserProvider({ children }: UserProviderProps) {
  const { user, setUser, cartQuantity, setCartQuantity } = useFetch();
  const [menuOptions, setMenuOptions] = useState(loggedOutMenu);
  const router = useRouter();

  useEffect(() => {
    if (verifyCookie()) {
      setMenuOptions(user?.role === "admin" ? adminMenu : customerMenu);
    }
  }, [user]);

  const handleCartQuantity = (quantity: number) => {
    setCartQuantity(quantity);
  };

  const handleLogin = async (user: User) => {
    const { quantity } = await getCartData();

    setUser(user);
    setCartQuantity(quantity);
    setMenuOptions(user.role === "admin" ? adminMenu : customerMenu);
  };

  const handleLogout = () => {
    destroyCookie(undefined, "pizzeria.token");

    setCartQuantity(0);
    setMenuOptions(loggedOutMenu);
    setUser(null);
  };

  const handleUser = (user: User) => {
    setUser(user);
  };

  const handlePurchase = async (item: PurchaseItem) => {
    if (!verifyCookie()) return router.push("/login");
    await createOrAddItemToCart(item, router);

    const { quantity } = await getCartData();
    setCartQuantity(quantity);
  };

  return (
    <userContext.Provider
      value={{
        user,
        cartQuantity,
        menuOptions,
        handleUser,
        handleLogin,
        handleLogout,
        handleCartQuantity,
        handlePurchase,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
