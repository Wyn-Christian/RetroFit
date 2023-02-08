import { http } from "../http";

export async function cartLoader() {
  let cartlist = await http.get(`/carts`).then((result) => result.data);
  let total = await http.get(`/carts/total`).then((result) => result.data);

  return { cartlist, total };
}

export async function addCartAction({ request, params }) {
  let formData = await request.formData();
  const cart = Object.fromEntries(formData);

  let result = await http
    .post(`/cart/add/${params.product_id}`, {
      price: cart.price,
    })
    .then((new_cart) => new_cart.data);

  return result;
}
export async function removeCartAction({ params }) {
  let result = await http
    .post(`/cart/remove/${params.id}`)
    .then((result) => result.data);
  return result;
}

export async function updateQuantityCartAction({ request, params }) {
  let formData = await request.formData();
  const cart = Object.fromEntries(formData);

  let result = await http
    .post(`/cart/update/${params.id}`, {
      quantity: cart.quantity,
    })
    .then((new_cart) => new_cart.data);

  return result;
}
