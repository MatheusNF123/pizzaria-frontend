import * as yup from "yup";

export const validationLogin = yup.object().shape({
  email: yup
    .string()
    .email("Não e um email valido")
    .required("Este campo é obrigatório"),
  password: yup.string().min(6).required("Este campo é obrigatório"),
});

export const validationRegister = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "nome deve ter 2 caracteres no mínimo")
    .required("Este campo é obrigatório"),
  lastName: yup
    .string()
    .min(2, "nome deve ter 2 caracteres no mínimo")
    .required("Este campo é obrigatório"),
  address: yup
    .string()
    .min(2, "address deve ter 2 caracteres no mínimo")
    .required("Este campo é obrigatório"),
  email: yup
    .string()
    .email("Não e um email valido")
    .required("Este campo é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter 6 caracteres no mínimo")
    .required("Este campo é obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não são iguais"),
  phone: yup
    .string()
    .matches(
      /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/,
      "Invalid Phone"
    )
    .required("Este campo é obrigatório"),
});
export const validationPerfil = yup.object().shape({
  image: yup.string().min(1).optional(),
  fullName: yup
    .string()
    .min(5, "nome deve ter 5 caracteres no mínimo")
    .required("Este campo é obrigatório"),
  address: yup
    .string()
    .min(2, "address deve ter 2 caracteres no mínimo")
    .required("Este campo é obrigatório"),
  email: yup
    .string()
    .email("Não e um email valido")
    .required("Este campo é obrigatório"),
  password: yup.string().min(6, "A senha deve ter 6 caracteres no mínimo"),
  phone: yup
    .string()
    .matches(
      /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/,
      "Invalid Phone"
    )
    .required("Este campo é obrigatório"),
});

export const validationEditCartItem = yup.object().shape({
  size: yup.string(),
  border: yup.bool(),
  quantity: yup
    .number()
    .min(1, "O valor deve ser maior ou igual a 1")
    .required("Este campo é obrigatório"),
});

export const validationPizza = yup.object().shape({
  flavor: yup
    .string()
    .min(3, "nome deve ter 5 caracteres no mínimo")
    .required("Este campo é obrigatório"),
  type: yup
    .string()
    .min(2, "nome deve ter 2 caracteres no mínimo")
    .required("Este campo é obrigatório"),
  price: yup
    .number()
    .min(1, "O valor deve ser maior ou igual a 1")
    .required("Este campo é obrigatório"),
  ingredients: yup
    .array(yup.string())
    // .of(yup.string().required("O valor deve ser uma string"))
    .required("Este campo é obrigatório"),
  img: yup.string().required("Este campo é obrigatório"),
});

export const validationFieldIngredient = yup.string().matches(/^[a-zA-Z]+$/, 'O nome deve conter somente letras')

