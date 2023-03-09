import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";
import { userContext } from "../context/userProvider";

import { Pizza } from "../Types";

type PizzaCardProps = {
  info: Pizza;
};

export default function PizzaCard({
  info: { id, img, flavor, price },
}: PizzaCardProps) {
  const router = useRouter();
  const { handlePurchase } = useContext(userContext);
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        elevation={10}
        sx={{
          backgroundColor: "#303030",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          color: "white",
          transition: ".2s",
          borderRadius: "8px",
          borderBottom: "2px solid #7c7c7c",
          "&:hover": {
            transform: "scale(1.05)",
            borderBottom: "2px solid #e76e0abd",
          },
        }}
      >
        <CardMedia
          image={img}
          title="Pizza Image"
          sx={{
            paddingTop: "56.25%",
          }}
        />
        <CardContent>
          <Typography variant="h6">{flavor}</Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "10px",
            flexWrap: "wrap-reverse",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "4px",
            }}
          >
            <Button variant="contained" onClick={() => handlePurchase({
              pizzaId: id,
              size: 'medium',
              quantity: 1,
              border: false,
            })}>
              Adicionar ao carrinho
            </Button>
            <Button
              variant="contained"
              onClick={() => router.push(`/pizzas/${id}`)}
            >
              Detalhes
            </Button>
          </Box>
          <Typography
            sx={{
              marginBottom: "4px",
              backgroundColor: "#E60A30",
              color: "#FFFFFF",
              padding: "4px",
              borderRadius: "5px",
            }}
            component="span"
          >
            R$: {price}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
}
