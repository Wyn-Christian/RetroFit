import { redirect } from "react-router-dom";
import { http } from "../http";

export async function orderAction({ request }) {
  let formData = await request.formData();
  const order = Object.fromEntries(formData);

  let result = await http.post(`/order/create`, {
    order_items: JSON.parse(order.order_items),
    total: JSON.parse(order.total),
  });
  return order;
}
