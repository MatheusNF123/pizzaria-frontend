import { GetServerSideProps } from "next";
import Head from "next/head";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { getRequest } from "../../src/services/api";
import Header from "../../src/components/header";
import { Pizza } from "../../src/Types";
import Image from "next/image";
import Layout from "../../src/components/layout";

type PizzaDetailsProps = {
  pizza: Pizza;
};

export default function PizzaDetails({
  pizza: { img, flavor, ingredients, price, type },
}: PizzaDetailsProps) {
  // console.log(pizza);

  return (
    <Layout title="Detalhes da pizza">
      <Box 
        sx={{
          // backgroundColor: "red",
          minHeight: "calc(100vh - 100px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {/* <Header /> */}
        <Stack
          maxWidth="xl"
          direction={{ xs: "column", md: "row" }}
          flex={1}
          justifyContent="space-between"
          spacing={1}
        >
          <Box
            flex={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={img}
              alt="Pizza Image"
              width={400}
              height={400}
              style={{ borderRadius: "10px" }}
            />
          </Box>
          <Box
            flex={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography variant="h3" sx={{ alignSelf: "center" }}>
              {flavor}
            </Typography>
            <Typography variant="h6">
              <strong>Tipo: </strong>
              {type}
            </Typography>
            <Typography component="ul" variant="h6">
              Ingredientes
            </Typography>
            {ingredients.map((item) => (
              <Typography key={item} component="li" variant="h6">
                {item}
              </Typography>
            ))}
            <Typography variant="h6">{`Preço: R$ ${price}`}</Typography>
            <Button variant="contained">Comprar</Button>
          </Box>
        </Stack>
      </Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await getRequest(`pizzas/${ctx.query.id}`);

  return {
    props: { pizza: data },
  };
};
