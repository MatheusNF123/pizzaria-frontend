import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { setCookie } from "nookies";

import { postRequest } from "../services/api";
import { validationLogin } from "../utils/schemas/formValidations";
import { Login } from "../Types";
import { userContext } from "../context/userProvider";

interface MyFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { handleLogin } = useContext(userContext);
  const router = useRouter();
  const initialValues: MyFormValues = { email: "", password: "" };

  async function handleOnSubmitLogin(
    { email, password }: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) {
    try {
      const {
        data: { message, token, ...user },
        status,
      } = await postRequest<Login>("login", { email, password });
      if (status !== 200) return alert(`${message}`);

      setCookie(undefined, "pizzeria.token", token, {
        maxAge: 60 * 60 * 20, // 20 hours
      });

      await handleLogin(user);

      actions.resetForm();
      router.push("/pizzas");
    } catch (err) {
      return alert(`Erro interno, volte mais tarde :)`);
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3}>
        <Box
          m={5}
          p={3}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleOnSubmitLogin}
            validationSchema={validationLogin}
          >
            {(props) => {
              return (
                <Form>
                  <Typography variant="h4">Login</Typography>
                  <Field
                    name="email"
                    type="email"
                    label="Email"
                    as={TextField}
                    placeholder="Digite seu email"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    helperText={<ErrorMessage name="email" />}
                    error={props.errors.email && props.touched.email}
                  />
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    as={TextField}
                    placeholder="Digite sua senha"
                    margin="dense"
                    fullWidth
                    helperText={<ErrorMessage name="password" />}
                    error={props.errors.password && props.touched.password}
                  />
                  <Typography style={{ color: "#757575" }} mt={1} mb={2}>
                    Não tem uma conta?
                    <Link
                      style={{ textDecoration: "none", color: "#1769aa" }}
                      href="/register"
                    >
                      {" "}
                      crie uma!
                    </Link>
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
}
