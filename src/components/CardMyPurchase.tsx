import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Divider,
  Container,
} from "@mui/material";
import { useRouter } from "next/router";

import { Order } from "../Types";
import { formatDate } from "../utils/formatDate";
import verifyDate from "../utils/verifyDate";
import { patchRequest } from "../services/api"
import setApiHeaders from "../services/setApiHeaders";

export default function CardMyPurchase({
  date,
  ordersPizzas,
  status,
  totalPrice,
  id
}: Order) {
  const router = useRouter();


  const cancelOrder = async () => {
    try {
      setApiHeaders();
      await patchRequest(`order/${id}`)
    } catch {
      return alert(`Erro interno, volte mais tarde :)`);
    }
  }

  return (
    <Container>
      <Card elevation={0} sx={{ display: "flex" }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ m: 1, fontWeight: "bold" }} component="span">
                {formatDate(new Date(date))}
              </Typography>
              <Typography
                sx={{ display: "flex", m: 1, fontWeight: "bold" }}
                component="span"
              >
                <Typography>Total R$: </Typography> {totalPrice}
              </Typography>
            </Box>
            <Divider />
            {ordersPizzas.map((ordersPizza) => (
              <>
               <Divider />
              <CardContent
                key={ordersPizza.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flex: "1",
                  }}
                >
                  
                  <Box sx={{ mr: 1 }}>
                    <CardMedia
                      sx={{
                        width: '120px',
                        height: '120px',
                        border: "2px solid black",
                        // margin: "20px 5px 20px 20px",
                      }}
                      image={ordersPizza.pizza.img}
                      title="Pizza Image"
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                      {ordersPizza.pizza.flavor}
                    </Typography>
                    <Typography variant="subtitle2">
                      {ordersPizza.quantity} uni.
                    </Typography>
                    <Typography sx={{ mb: 1 }} variant="subtitle2">
                      R$ {ordersPizza.pizza.price}
                    </Typography>
                    <Box sx={{ flex: 1, display: {xs: "flex", sm: 'none', md: "none", lg: "none" } }}>
                      Status:
                      <Typography
                        sx={{
                          color: status === "Comprado" ? "#13AD5D" : "red",
                        }}
                        component="span"
                      >
                        {" "}
                        {status}
                      </Typography>
                    </Box>
                  </Box>
                 
                </Box>
                
                <CardActions
                  sx={{
                    display: "flex",
                    padding: { xs: "5px 0px", },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: { xs: "100%" },
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <Button
                      sx={{ fontSize: "12px" }}
                      variant="contained"
                      onClick={() =>
                        router.push(`/pizzas/${ordersPizza.pizza.id}`)
                      }
                    >
                      comprar novamente
                    </Button>

                  </Box>
                </CardActions>
               
              </CardContent>
              </>
            ))}
            <Divider />

                  <CardActions
                  sx={{
                    display: "flex",
                    padding: { xs: "5px 20px",
                  justifyContent: "space-between", width: "100%" },
                  }}
                >
                    <Box
                    sx={{
                      // flex: 1,
                      display: {
                        xs: "none",
                        sm: "flex",
                        md: "flex",
                        lg: "flex",
                      },
                    }}
                  >
                    Status:
                    <Typography
                      sx={{ color: status === "Comprado" ? "#13AD5D" : "red" }}
                      component="span"
                    >
                      {" "}
                      {status}
                    </Typography>
                  </Box>
                    <Button
                      sx={{ fontSize: "12px", marginBottom: "5px", width: {xs: "100%", sm: "initial"} }}
                      disabled={verifyDate(date)}
                      variant="contained"
                      onClick={cancelOrder}
                      color="error"
                      
                    >
                      cancelar pedido
                    </Button>
                </CardActions>
                  
          </Box>
        </Container>
      </Card>
    </Container>
  );
}
