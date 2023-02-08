import { createContext, useContext, useState } from "react";

const useCartSource = () => {
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState([]);
  return { cartList, setCartList, total, setTotal };
};

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  return (
    <CartContext.Provider value={useCartSource()}>
      {children}
    </CartContext.Provider>
  );
};
