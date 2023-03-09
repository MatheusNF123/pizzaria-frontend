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
import DeleteIcon from "@mui/icons-material/Delete";

import setApiHeaders from "../services/setApiHeaders";
import { deleteRequest } from "../services/api";
import { User } from "../Types";

type AdminUserProps = {
  user: User;
  handleUsersReload: () => Promise<void>;
};

export default function AdminUserCard({
  user,
  handleUsersReload,
}: AdminUserProps) {
  const { id, name, address, email, phone, img } = user;

  const handleUserDeletion = async () => {
    setApiHeaders();
    await deleteRequest(`admin/user/${id}`);

    await handleUsersReload();
  };
  return (
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
              <CardMedia
                sx={{
                  width: "120px",
                  height: "120px",
                  border: "2px solid black",
                }}
                image={img}
                title="Pizza Image"
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
                  {name}
                </Typography>
                <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
                  {address}
                </Typography>
                <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
                  {email}
                </Typography>
                <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
                  {phone}
                </Typography>
              </Box>
              <CardActions
                sx={{
                  display: "flex",
                  padding: { xs: "5px 0px" },
                }}
              >
                <Tooltip title="Excluir">
                  <IconButton
                    aria-label="Excluir usuário"
                    onClick={() => handleUserDeletion()}
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
  );
}
