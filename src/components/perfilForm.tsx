import { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";

import { validationPerfil } from "../utils/schemas/formValidations";

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";

import {
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  Paper,
  Grid,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { userContext } from "../context/userProvider";
import { putRequest } from "../services/api";

interface MyFormValues {
  image?: string;
  fullName: string;
  address?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export default function PerfilForm() {
  const { user, handleUser } = useContext(userContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const initialValues: MyFormValues = {
    image: user?.img || '',
    fullName: user?.name! || '',
    address: user?.address || '',
    email: user?.email || '',
    password: '',
    phone: user?.phone || '',
  };

  async function handleOnSubmitEditProfile(
    { fullName, address, email, password, phone, image }: MyFormValues,
  ) {
    const _fullName = fullName?.split(" ");
    const [firstName, ...lastName] = _fullName;

    try{
      const { data, status } = await putRequest("update", {
        name: `${firstName} ${lastName.join(' ')}`,
        address,
        email,
        password: password || undefined,
        phone,
        img: image
      });
      if (status !== 200) return alert(`${data.message}`);
      setIsEditing(false)
      setEditPassword(false)
      setShowPassword(false)
      handleUser(data)
    } catch (err) {
      return alert(`Erro interno, volte mais tarde :)`);
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
            onSubmit={handleOnSubmitEditProfile}
            validationSchema={validationPerfil}
            enableReinitialize
          >
            {(props) => {
              return (
                <Form>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4">Perfil</Typography>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      sx={{
                        background:
                          "linear-gradient(45deg, #3f51b5 30%, #5a55ae 90%)",
                        border: 0,
                        borderRadius: 3,
                        boxShadow: "0 3px 5px 2px rgba(58, 83, 181, .3)",
                        color: "white",
                        height: 48,
                        padding: "0 20px",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #7f7da8 30%, #13151f 90%)",
                          boxShadow: "0 3px 5px 2px rgba(90, 85, 174, .3)",
                        },
                      }}
                    >
                      <EditIcon fontSize="large" />
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        component="img"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "180px",
                          height: "180px",
                          backgroundColor: "#e5e5e5",
                          transition: ".2s",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        alt=""
                        src={
                          props.values.image ||
                          "https://cdn-icons-png.flaticon.com/512/711/711769.png"
                        }
                      />
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="fullName"
                        label="Nome"
                        type="text"
                        as={TextField}
                        placeholder="Nome"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        helperText={<ErrorMessage name="fullName" />}
                        error={
                          props.touched.fullName &&
                          Boolean(props.errors.fullName)
                        }
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {editPassword ? (
                        <Field
                          id="password"
                          label="Senha"
                          name="password"
                          as={TextField}
                          type={showPassword ? "text" : "password"}
                          variant="outlined"
                          margin="dense"
                          fullWidth
                          placeholder="Digite uma senha"
                          helperText={<ErrorMessage name="password" />}
                          disabled={!isEditing}
                          error={
                            props.errors.password &&
                            Boolean(props.touched.password)
                          }
                          onBlur={props.handleBlur}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleClickShowPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      ) : (
                        <Button
                          size="large"
                          sx={{ marginTop: "8px", height: "56px" }}
                          disabled={!isEditing}
                          fullWidth
                          onClick={(e) => setEditPassword(true)}
                          variant="contained"
                        >
                          Alterar Senha
                        </Button>
                      )}
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
                    error={props.errors.email && Boolean(props.touched.email)}
                    disabled={!isEditing}
                  />
       
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
                    error={props.errors.phone && Boolean(props.touched.phone)}
                    disabled={!isEditing}
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
                    error={
                      props.errors.address && Boolean(props.touched.address)
                    }
                    disabled={!isEditing}
                  />
                  <Field
                    name="image"
                    label="URL do avatar"
                    id="image"
                    type="text"
                    placeholder="URL do avatar"
                    as={TextField}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    helperText={<ErrorMessage name="image" />}
                    error={props.errors.image}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    disabled={!isEditing}
                  />

                  <Button color="primary"
                   variant="contained"
                    type="submit"
                    disabled={!isEditing}>
                    
                    salvar
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
