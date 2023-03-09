import { Button, Card, CardContent, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import CardMyPurchase from "../../src/components/CardMyPurchase";
import Layout from "../../src/components/layout";
import { getRequest, postRequest } from "../../src/services/api";
import setApiHeaders from "../../src/services/setApiHeaders";
import { Order } from "../../src/Types";

type OrderProps = {
  orders: Order[];
};

export default function MyOrders({ orders }: OrderProps) {
  const router = useRouter();
  return (
    <Layout title="Meus pedidos">
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "calc(100vh - 87px)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
        }}
      >
        {orders.length ?
          orders.map((order) => <CardMyPurchase {...order} key={order.id} />)
          :
          <Container
            sx={{
              minHeight: "calc(100vh - 87px)",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "20px",
              backgroundColor: 'white',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card sx={{ display: 'flex', justifyContent: "center" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="body2" sx={{ fontSize: '26px' }}>
                    Não possui nenhuma compra
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <Button
                    sx={{ fontSize: "14px" }}
                    variant="contained"
                    onClick={() =>
                      router.push(`/pizzas`)
                    }
                  >
                    comprar
                  </Button>
                </Box>
              </Box>
            </Card>

          </Container>}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    setApiHeaders(ctx);
    const { data } = await getRequest<Order[]>(`order`);

    return {
      props: { orders: data },
    };
  } catch (error) {
    return {
      props: { orders: [] },
    };
  }
};
