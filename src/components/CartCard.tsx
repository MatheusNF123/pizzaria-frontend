import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Container,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { CartPizzas, PurchaseInfo } from "../Types";
import CartItemModalForm from "./cartItemModalForm";
import setApiHeaders from "../services/setApiHeaders";
import { deleteRequest, putRequest } from "../services/api";

type CartCardProps = {
  info: CartPizzas;
  cartId?: string;
  handleCartReload: () => Promise<void>;
};

export default function CartCard({
  info,
  cartId,
  handleCartReload,
}: CartCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const { id, quantity, border, size, pizza } = info;
  const { flavor, img, price } = pizza;

  const handleCartItemDeletion = async () => {
    setApiHeaders();
    await deleteRequest(`/cart/${cartId}/item/${id}`);

    await handleCartReload();
  };

  const handleCartItemUpdate = async (cartItemInfo: PurchaseInfo) => {
    setApiHeaders();
    await putRequest(`/cart/${cartId}/item/${id}`, cartItemInfo);

    await handleCartReload();
    setOpenModal(false);
  };

  return (
    <Container>
      <Divider color="white" />
      <Card elevation={0} sx={{ display: "flex", backgroundColor: "inherit" }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent
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
                      width: "120px",
                      height: "120px",
                      border: "2px solid black",
                    }}
                    image={img}
                    title="Pizza Image"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {flavor}
                  </Typography>
                  <Typography variant="subtitle2">{quantity} uni.</Typography>
                  <Typography variant="subtitle2">
                    {border ? "Tem borda" : "Sem borda"}
                  </Typography>
                  <Typography variant="subtitle2">{size}</Typography>
                  <Typography sx={{ mb: 1 }} variant="subtitle2">
                    R$ {price}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    display: "flex",
                    padding: { xs: "5px 0px" },
                  }}
                >
                  <Tooltip title="Editar">
                    <IconButton
                      aria-label="Editar pedido do carrinho"
                      onClick={() => setOpenModal(true)}
                    >
                      <EditIcon fontSize="large" sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton
                      aria-label="Excluir pedido do carrinho"
                      onClick={() => handleCartItemDeletion()}
                    >
                      <DeleteIcon fontSize="large" sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Box>
            </CardContent>
          </Box>
        </Container>
      </Card>
      <CartItemModalForm
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleCartItemUpdate={handleCartItemUpdate}
        info={info}
      />
    </Container>
  );
}
