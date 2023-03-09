import {
  Modal,
  Box,
  Button,
  Avatar,
  TextField,
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import {
  validationPizza,
  validationFieldIngredient,
} from "../utils/schemas/formValidations";
import { Pizza } from "../Types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "80%",
  overflow: "auto",
  width: 400,
  color: "white",
  bgcolor: "inherit",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type PizzaCreateModalFormProps = {
  open: boolean;
  handleClose: () => void;
  handlePizzaCreate: (pizzaInfo: Omit<Pizza, "id">) => Promise<void>;
};

export default function PizzaCreateModalForm({
  open,
  handleClose,
  handlePizzaCreate,
}: PizzaCreateModalFormProps) {

  const handleIngredientsAddition = async (
    oddIngredients: string[],
    newValue: string,
    setField: (field: string, value: string[] | string) => void,
    setFieldError: (field: string, value: string | undefined) => void
  ) => {
    try {
      await validationFieldIngredient.validate(newValue);

      const newIngredients = [...oddIngredients, newValue];
      setField("ingredients", newIngredients);
      setField("ingredient", "");
    } catch (error: any) {
      setFieldError("ingredient", error.message);
    }
  };

  const handleIngredientDeletion = (
    oddIngredients: string[],
    index: number,
    setField: (field: string, value: string[]) => void
  ) => {
    const newIngredients = oddIngredients.filter((_, i) => i != index);
    setField("ingredients", newIngredients);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Avatar
          sx={{
            width: "100px",
            height: "100px",
            backgroundColor: "#e5e5e5",
            transition: ".2s",
          }}
          alt="Pizza image"
          src={""}
        />
        <Formik
          initialValues={{
            flavor: "",
            type: "",
            price: 30,
            ingredient: "",
            ingredients: [],
            img: "",
          }}
          onSubmit={async ({ ingredient, ...fields }) => {
            console.log(fields);
            await handlePizzaCreate(fields);
          }}
          validationSchema={validationPizza}
        >
          {(props) => (
            <Form>
              <Field
                name="flavor"
                label="Nome"
                type="text"
                as={TextField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite o nome da pizza"
                helperText={<ErrorMessage name="flavor" />}
                error={props.errors.flavor}
              />
              <Field
                name="type"
                label="Categoria"
                type="text"
                as={TextField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite a categoria"
                helperText={<ErrorMessage name="type" />}
                error={props.errors.type}
              />
              <Field
                name="price"
                label="Preço"
                type="number"
                as={TextField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite o preço"
                helperText={<ErrorMessage name="price" />}
                error={props.errors.price}
              />
              <Field
                name="ingredient"
                label="Ingrediente"
                type="text"
                as={TextField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite o ingrediente"
                helperText={<ErrorMessage name="ingredient" />}
                error={props.errors.ingredient}
              />
              <ul>
                {props.values.ingredients.map((ingredient, i) => (
                  <li key={i} style={{
                    "alignItems": "center",
                    "display": "flex",
                    "justifyContent": "space-between"
                  }}>
                    {ingredient}
                    <Button
                      onClick={() =>
                        handleIngredientDeletion(
                          props.values.ingredients,
                          i,
                          props.setFieldValue
                        )
                      }
                    >
                      <CloseIcon />
                    </Button>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleIngredientsAddition(
                  props.values.ingredients,
                  props.values.ingredient,
                  props.setFieldValue,
                  props.setFieldError
                )}
              >
                Adicionar
              </Button>
              <Field
                name="img"
                label="URL da imagem"
                type="text"
                as={TextField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite a URL da imagem"
                helperText={<ErrorMessage name="img" />}
                error={props.errors.img}
              />

              <Button color="primary" variant="contained" type="submit">
                Criar
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal >
  );
}
