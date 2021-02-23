import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//REGISTER A NEW USER

export const registerUser = (username, email, password) => {
  //prevent this function from being runned on the server

  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { username, email, password })
      .then((res) => {
        resolve(res);

        Cookie.set("token", res.data.jwt);

        Router.push("/");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const login = (identifier, password) => {
  //prevent code being executed on the server

  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local`, { identifier, password })
      .then((res) => {
        //resolve promise and set loading to false on signup page
        resolve(res);
        //set token response from the server
        Cookie.set("token", res.data.jwt);

        //redirect to home page
        Router.push("/");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = () => {
  //remove token and user cookie
  Cookie.remove("token");
  delete window.__user;

  //sync logout across multiple windows
  window.localStorage.setItem("logout", Date.now());

  //redirect ot home page
  Router.push("/");
};

//altenatively, we can use HOC (Higher Order Component) to wrapp our pages so that
//we can logout on every logged in tab simultaneously

export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        Router.push("/");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);
      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };
  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
