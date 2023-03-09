import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import { Box, Button, Card, Container, Divider, Typography } from "@mui/material";

import CartCard from "../../src/components/CartCard";
import Layout from "../../src/components/layout";
import { getRequest, postRequest } from "../../src/services/api";
import setApiHeaders from "../../src/services/setApiHeaders";
import { userContext } from "../../src/context/userProvider";
import { Cart as CartType } from "../../src/Types";
import getCartData from "../../src/services/getCartData";

type CartProps = {
  cart: CartType | null;
};

export default function Cart(props: CartProps) {
  const router = useRouter();
  const [cart, setCart] = useState<CartType | null>(props.cart);
  const { handleCartQuantity } = useContext(userContext);

  const handleCartReload = async () => {
    const { quantity, data } = await getCartData();
    setCart(data);
    handleCartQuantity(quantity);
  };

  const handlePurchaseFinished = async () => {
    const pizzas = cart?.cartPizzas.map(({ pizza, border, quantity, size }) => (
      { pizzaId: pizza.id, border, quantity, size }
    ));
    setApiHeaders();
    await postRequest(
      "/order",
      {
        cartId: cart?.id,
        pizzas,
      });

    await handleCartReload()
  };

  return (
    <Layout title="Carrinho">
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "calc(100vh - 87px)",
          width: "100%",
          display: "flex",
        }}
      >
        {cart ? (
          <Box
            sx={{
              color: "white",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "20px",
              width: "100%",
            }}
          >
            <Typography
              sx={{ display: "flex", m: 1, fontWeight: "bold" }}
              component="span"
            >
              <Typography>Total R$: </Typography> {cart?.totalPrice}
            </Typography>
            {cart?.cartPizzas.map((item) => (
              <CartCard
                info={item}
                cartId={props.cart?.id}
                handleCartReload={handleCartReload}
                key={item.id}
              />
            ))}
            <Button
              // sx={{
              //   width: "70%",
              // }}
              variant="contained"
              onClick={handlePurchaseFinished}
            >
              Finalizar compra
            </Button>
            {/* <Divider color="white" /> */}
          </Box>
        ) : (
          <Box
            sx={{
              alignItems: "center",
              flex: "1",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Card
              sx={{
                alignItems: "center",
                backgroundColor: "inherit",
                border: "1px solid white",
                color: "white",
                display: "flex",
                flexDirection: "column",
                height: "300px",
                justifyContent: "space-around",
                width: "500px",
              }}
            >
              <Typography
                sx={{ display: "flex", fontSize: "2rem", fontWeight: "bold" }}
                component="h1"
              >
                Carrinho vazio
              </Typography>
              <Button
                sx={{
                  width: "70%",
                }}
                variant="contained"
                onClick={() => router.push("/pizzas")}
              >
                Continuar comprando
              </Button>
            </Card>
          </Box>
        )}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {    
    setApiHeaders(ctx);
    const { data, status } = await getRequest<CartType>("/cart");
    
    if (status === 401)
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };

    if (status === 200)
      return {
        props: { cart: data },
      };

    return {
      props: { cart: null },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
