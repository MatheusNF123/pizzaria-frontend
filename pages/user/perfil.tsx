import { Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import Layout from "../../src/components/layout";
import PerfilForm from "../../src/components/perfilForm";

export default function Profile() {
  const router = useRouter();
  return (
    <Layout title="perfil">
      <Container
        maxWidth='xl'
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
        <PerfilForm />
      </Container>
    </Layout>

  )
}