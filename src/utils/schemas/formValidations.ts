import * as yup from "yup"

export const validationLogin = yup.object().shape({
  email: yup.string().email("Não e um email valido").required("Este campo é obrigatório"),
  password: yup.string().min(6, "A senha deve ter 8 caracteres").required("Este campo é obrigatório"),
})

export const validationRegister = yup.object().shape({
  name: yup.string().min(2, "nome deve ter 2 caracteres no mínimo").required("Este campo é obrigatório"),
  address: yup.string().min(2, "address deve ter 2 caracteres no mínimo").required("Este campo é obrigatório"),
  email: yup.string().email("Não e um email valido").required("Este campo é obrigatório"),
  password: yup.string().min(6, "A senha deve ter 8 caracteres no mínimo").required("Este campo é obrigatório"),
  confirmPassword: yup.string().oneOf([yup.ref("password"),null], "As senhas não são iguais"),  
  phone: yup.string().matches(
    /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/,
    "Invalid Phone"
  ).required("Este campo é obrigatório")
})