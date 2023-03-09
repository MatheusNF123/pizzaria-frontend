import { GetStaticProps } from "next";
import Head from "next/head";
import { Box, Grid, Container } from "@mui/material";

import { getRequest } from "../../src/services/api";
import PizzaCard from "../../src/components/pizzaCard";
import Header from "../../src/components/header";
import { Pizza } from "../../src/Types";
import Layout from "../../src/components/layout";

type HomeProps = {
  pizzas: Pizza[];
};

export default function Pizzas({ pizzas }: HomeProps) {
  return (
    <Layout title="Pizzas">
      <Container
        maxWidth="xl"
        sx={{
          // height: "100%",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Grid container spacing={4}>
          {pizzas.map((pizza) => (
            <PizzaCard info={pizza} key={pizza.id} />
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { status, data } = await getRequest("pizzas");

    if (status !== 200) {
      return {
        props: { pizzas: [] },
      };
    }

    return {
      props: { pizzas: data },
      revalidate: 60 * 60,
    };
  } catch (error) {
    return {
      props: { pizzas: [] },
    };
  }
};
