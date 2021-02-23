import "../styles/globals.css";

import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [cart, updateCart] = useState({ items: [], total: 0 });

  useEffect(async () => {
    const token = await Cookie.get("token");

    if (token) {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        Cookie.remove("token");
        setUser(null);
        return null;
      }
      const user = await res.json();
      setUser(user);
    }
  }, []);

  const addItem = (item) => {
    // const { items } = cart;
    //if new item is in cart , increase its quantity
    //else add it to cart and init its quantity to 1
    const itemInCart = cart.items.find((i) => i.id === item.id);

    if (!itemInCart) {
      item.quantity = 1;
      updateCart({
        items: [...cart.items, item],
        total: cart.total + item.price,
      });
    } else {
      updateCart({
        items: cart.items.map((item) =>
          item.id === itemInCart.id
            ? Object.assign({}, item, { quantity: item.quantity + 1 })
            : item
        ),
        total: cart.total + item.price,
      });
    }
  };

  const removeItem = (item) => {
    const itemInCart = cart.items.find((i) => i.id === item.id);

    if (itemInCart.quantity > 1) {
      updateCart({
        items: cart.items.map((item) =>
          item.id === itemInCart.id
            ? Object.assign({}, item, { quantity: item.quantity - 1 })
            : item
        ),
        total: cart.total - item.price,
      });
    } else {
      const items = [...cart.items];
      const index = items.findIndex((i) => i.id === itemInCart.id);

      items.splice(index, 1);
      updateCart({
        items,
        total: cart.total - item.price,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
        cart,
        addItem,
        removeItem,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default withData(MyApp);
