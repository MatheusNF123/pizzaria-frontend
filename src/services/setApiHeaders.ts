import { parseCookies } from "nookies";
import { api } from "./api";

export default function setApiHeaders(ctx?: any) {
  const { 'pizzeria.token': token } = parseCookies(ctx);
  api.defaults.headers.common['Authorization'] = token;
}