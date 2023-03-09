import {
  Modal,
  Box,
  Button,
  Avatar,
  Typography,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  styled,
} from "@mui/material";

import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  ErrorMessage,
  useFormikContext,
} from "formik";

import { validationEditCartItem } from "../utils/schemas/formValidations";
import { CartPizzas, PurchaseInfo } from "../Types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "white",
  bgcolor: "inherit",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type CartItemModalFormProps = {
  open: boolean;
  handleClose: () => void;
  handleCartItemUpdate: (cartItemInfo: PurchaseInfo) => Promise<void>;
  info: CartPizzas;
};

export default function CartItemModalForm({
  open,
  handleClose,
  handleCartItemUpdate,
  info,
}: CartItemModalFormProps) {
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
          src={info.pizza.img}
        />
        <Typography>Nome: {info.pizza.flavor}</Typography>
        <Formik
          enableReinitialize
          initialValues={{
            size: "medium",
            border: false,
            quantity: 1,
          }}
          onSubmit={async (values) => {
            console.log(values);
            await handleCartItemUpdate(values);
          }}
          validationSchema={validationEditCartItem}
        >
          {(props) => (
            <Form>
              <Field
                labelId="select-size-label"
                name="size"
                label="Tamanho"
                helperText={<ErrorMessage name="size" />}
                error={props.errors.size}
                sx={{
                  color: "white",
                }}
                as={Select}
              >
                <MenuItem value="medium">Médio</MenuItem>
                <MenuItem value="big">Grande</MenuItem>
                <MenuItem value="small">Pequeno</MenuItem>
              </Field>

              <Field
                name="border"
                label="Borda"
                size="large"
                type="checkbox"
                sx={{
                  color: "white",
                }}
                as={Checkbox}
                variant="outlined"
                margin="dense"
                helperText={<ErrorMessage name="border" />}
                error={props.errors.border}
              />
              <Field
                name="quantity"
                label="Quantidade"
                type="number"
                // variant="outlined" 
                margin="dense"
                fullWidth
                helperText={<ErrorMessage name="quantity" />}
                error={props.errors.quantity}
                sx={{
                  color: "white",
                  borderColor: "white",

                  "& input:valid + fieldset": {
                    borderColor: "white",
                    borderWidth: 2,
                  },
                }}
                as={TextField}
                InputProps={{
                  style: { color: 'white', borderColor: "white" },
                  inputProps: {
                    min: 1,
                  },
                }}
              />
              <Button color="primary" variant="contained" type="submit">
                Editar
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
