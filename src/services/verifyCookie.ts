import { parseCookies } from "nookies";

export default function verifyCookie(ctx?: any): boolean {
  const { 'pizzeria.token': token } = parseCookies(ctx);
  return !!token;
}
