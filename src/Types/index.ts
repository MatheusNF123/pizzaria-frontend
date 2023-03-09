export interface Pizza {
  id: string;
  flavor: string;
  type: string;
  price: number;
  ingredients: string[];
  img: string;
}

export interface User {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  role: string;
  img: string;
}

export interface Login extends User {
  token: string;
}

export interface PurchaseInfo {
  size: string;
  border: boolean;
  quantity: number;
}

export interface CartPizzas extends PurchaseInfo {
  id: string;
  pizza: Pizza;
}

export interface Cart {
  id: string;
  user: User;
  cartPizzas: CartPizzas[];
  totalPrice: number;
}

export interface OrdersPizzas extends PurchaseInfo {
  id: string;
  pizza: Pizza;
}

export interface Order {
  id: string;
  user: User;
  ordersPizzas: OrdersPizzas[];
  status: string;
  date: string;
  totalPrice: number;
}

export interface ApiReturnMessage {
  message: string;
}

export interface PurchaseItem extends PurchaseInfo {
  pizzaId: string;
}

export interface createOrder {
  cartId: string;
  pizzas: PurchaseItem[];
}
