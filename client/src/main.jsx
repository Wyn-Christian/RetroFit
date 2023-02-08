import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./contexts/theme";

// Routes
import Error from "./routes/Error";
import Root from "./routes/Root";
import Home from "./routes/Home";
import AllProducts, { allProductsLoader } from "./routes/AllProducts";
import Categories from "./routes/Categories";
import Product, { productLoader } from "./routes/Product";
import {
  addCartAction,
  cartLoader,
  removeCartAction,
  updateQuantityCartAction,
} from "./routes/cart";
import { CartProvider } from "./contexts/cart";
import OrderHistory, { orderHistoryLoader } from "./routes/OrderHistory";
import { orderAction } from "./routes/order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: cartLoader,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
            loader: allProductsLoader,
          },
          {
            path: "product/:id",
            element: <Product />,
            loader: productLoader,
          },
          {
            path: "categories",
            element: <Categories />,
            loader: allProductsLoader,
          },
          {
            path: "/cart",
            children: [
              {
                path: "add/:product_id",
                action: addCartAction,
              },
              {
                path: "remove/:id",
                action: removeCartAction,
              },
              {
                path: "update/:id",
                action: updateQuantityCartAction,
              },
            ],
          },
          {
            path: "order",
            element: <>haiz</>,
            action: orderAction,
          },
          {
            path: "order-history",
            element: <OrderHistory />,
            loader: orderHistoryLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
