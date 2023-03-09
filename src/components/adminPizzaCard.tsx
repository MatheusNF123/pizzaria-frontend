import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Pizza } from "../Types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PizzaUpdateModalForm from "./pizzaUpdateModalForm";
import setApiHeaders from "../services/setApiHeaders";
import { deleteRequest, putRequest } from "../services/api";

type AdminPizzaCardProps = {
  pizza: Pizza;
  handlePizzasReload: () => Promise<void>;
};

export default function AdminPizzaCard({
  pizza,
  handlePizzasReload,
}: AdminPizzaCardProps) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { id, flavor, price, img, ingredients, type } = pizza;

  const handlePizzaUpdate = async (pizzaInfo: Omit<Pizza, "id">) => {
    // setApiHeaders();
    // await putRequest(`admin/pizza`, { id, ...pizzaInfo });

    // await handlePizzasReload();
    // setOpenUpdateModal(false);
  };

  const handlePizzaDeletion = async () => {
    setApiHeaders();
    await deleteRequest(`admin/pizza/${id}`);

    await handlePizzasReload();
  };

  return (
    <Grid item xs={12}>
      <Card
        sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: 200, objectFit: "cover" },
            height: { xs: 150, sm: 222 },
          }}
          image={img}
        />
        <CardContent sx={{ width: "100%", padding: "12px" }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                fontSize: { xs: "18px", sm: "25px" },
              }}
              variant="h5"
              component="div"
            >
              {flavor}
            </Typography>
            <CardActions
              disableSpacing
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Tooltip title="Editar">
                <IconButton
                  aria-label="Editar Pizza"
                  onClick={() => setOpenUpdateModal(true)}
                >
                  <EditIcon fontSize="medium" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Excluir">
                <IconButton
                  aria-label="Excluir Pizza"
                  onClick={() => handlePizzaDeletion()}
                >
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Box>
          <Divider sx={{ marginBottom: "5px", background: "#e2e2e2" }} />

          <Box
            sx={{ display: { xs: "column", sm: "flex" }, alignItems: "center" }}
          >
            <Box sx={{ width: { xs: "100%", sm: "50%" }, marginRight: "5px" }}>
              <Typography gutterBottom variant="body1" component="div">
                Categoria: {type}
              </Typography>
              <Typography
                sx={{ marginBottom: { xs: "4px", sm: "0px" } }}
                variant="body1"
                component="div"
              >
                Preço: {price}
              </Typography>
            </Box>
            <Box>
              Ingredientes:
              <Box
                sx={{
                  flexWrap: { xs: "nowrap", sm: "wrap" },
                  display: "flex",
                  flexDirection: "column",
                  height: "100px",
                }}
              >
                {ingredients?.map((el, index) => (
                  <Typography
                    flexWrap="wrap"
                    component="li"
                    marginRight={1}
                    variant="body2"
                    color="text.secondary"
                    key={index + el}
                  >
                    {el}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <PizzaUpdateModalForm
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        handlePizzaUpdate={handlePizzaUpdate}
        info={pizza}
      />
    </Grid>
  );
}
