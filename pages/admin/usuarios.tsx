import { useState } from "react";
import { GetServerSideProps } from "next";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { getRequest } from "../../src/services/api";
import { User } from "../../src/Types";
import Layout from "../../src/components/layout";
import setApiHeaders from "../../src/services/setApiHeaders";
import AdminUserCard from "../../src/components/adminUserCard";

type AdminUsersProps = {
  users: User[] | null;
};

export default function AdminUsers(props: AdminUsersProps) {
  const [users, setUsers] = useState<User[] | null>(props.users);

  const handleUsersReload = async () => {
    try {
      setApiHeaders();
      const { data, status } = await getRequest<User[]>("admin/user");
      if (status !== 200) {
        setUsers(null);
      }
      setUsers(data);
    } catch (error) {
      setUsers(null);
    }
  };

  return (
    <Layout title="Admin: usuários">
      <Box
        sx={{
          minHeight: "calc(100vh - 100px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
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
          {users?.map((user) => (
            <AdminUserCard
              key={user.id}
              user={user}
              handleUsersReload={handleUsersReload}
            />
          ))}
        </Box>
      </Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    setApiHeaders(ctx);
    const { data, status } = await getRequest<User[]>("admin/user");

    if (status !== 200)
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };

    return {
      props: { users: data },
    };
  } catch (error) {
    return {
      props: { users: null },
    };
  }
};
