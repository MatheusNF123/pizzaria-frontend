import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, TextField, Typography, Box, Grid, Paper } from "@mui/material";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { setCookie } from "nookies";

import { postRequest } from "../services/api";
import {
  validationLogin,
  validationRegister,
} from "../utils/schemas/formValidations";
import { userContext } from "../context/userProvider";
import { Login } from "../Types";

interface MyFormValues {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export default function RegisterForm() {
  const { handleLogin } = useContext(userContext);
  const router = useRouter();
  const initialValues: MyFormValues = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };

  async function handleOnSubmitRegister(
    { firstName, lastName, address, email, password, phone }: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) {
    try {
      const {
        data: { message, token, ...user },
        status,
      } = await postRequest<Login>("register", {
        name: `${firstName} ${lastName}`,
        address,
        email,
        password,
        phone,
      });
      if (status !== 201) return alert(`${message}`);

      setCookie(undefined, "pizzeria.token", token, {
        maxAge: 60 * 60 * 20, // 20 hours
      });

      await handleLogin(user);

      actions.resetForm();
      router.push("/");
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
            onSubmit={handleOnSubmitRegister}
            validationSchema={validationRegister}
          >
            {(props) => {
              return (
                <Form>
                  <Typography variant="h4">Cadastro</Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="firstName"
                        label="Nome"
                        type="text"
                        as={TextField}
                        placeholder="Nome"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        helperText={<ErrorMessage name="firstName" />}
                        error={
                          props.errors.firstName && props.touched.firstName
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="lastName"
                        label="SobreNome"
                        type="text"
                        as={TextField}
                        placeholder="SobreNome"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        helperText={<ErrorMessage name="lastName" />}
                        error={props.errors.lastName && props.touched.lastName}
                      />
                    </Grid>
                  </Grid>

                  <Field
                    name="email"
                    label="Email"
                    type="email"
                    as={TextField}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    placeholder="Digite um email"
                    helperText={<ErrorMessage name="email" />}
                    error={props.errors.email && props.touched.email}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        id="password"
                        label="Senha"
                        name="password"
                        as={TextField}
                        type="password"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        placeholder="Digite uma senha"
                        helperText={<ErrorMessage name="password" />}
                        error={props.errors.password && props.touched.password}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="confirmPassword"
                        label="Confirmar"
                        type="password"
                        placeholder="Confirme sua senha"
                        as={TextField}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        helperText={<ErrorMessage name="confirmPassword" />}
                        error={
                          props.errors.confirmPassword &&
                          props.touched.confirmPassword
                        }
                      />
                    </Grid>
                  </Grid>
                  <Field
                    name="phone"
                    label="Telefone"
                    as={TextField}
                    id="phone"
                    type="text"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    placeholder="(00) 00000-0000"
                    helperText={<ErrorMessage name="phone" />}
                    error={props.errors.phone && props.touched.phone}
                  />
                  <Field
                    name="address"
                    label="Endereço"
                    id="address"
                    type="text"
                    placeholder="Digite seu endereço"
                    as={TextField}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    helperText={<ErrorMessage name="address" />}
                    error={props.errors.address && props.touched.address}
                  />
                  <Typography style={{ color: "#757575" }} mt={1} mb={2}>
                    <Link
                      style={{ textDecoration: "none", color: "#1769aa" }}
                      href="/login"
                    >
                      Já tem uma conta?
                    </Link>
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Cadastrar
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
