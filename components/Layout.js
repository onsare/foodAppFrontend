import { useContext } from "react";
import AppContext from "../context/AppContext";

import Link from "next/link";
import Head from "next/head";
import { Nav, NavItem, Container, Button } from "reactstrap";
import { logout } from "../lib/auth";

export default function Layout({ children }) {
  let title = "Food App";

  const { user, setUser } = useContext(AppContext);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
        />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <Nav className="navbar navbar-dark bg-dark fixed-top ">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">FoodApp</a>
            </Link>
          </NavItem>
          {user ? (
            <NavItem className="ml-auto">
              <Link href="/">
                <a>{user.username}</a>
              </Link>
            </NavItem>
          ) : (
            <NavItem className="ml-auto">
              <Link href="/signin">
                <a className="nav-link">
                  <Button outline>Sign in</Button>
                </a>
              </Link>
            </NavItem>
          )}
          {user ? (
            <NavItem>
              <Link href="/">
                <a className="nav-link">
                  <Button
                    onClick={() => {
                      logout(), setUser(null);
                    }}
                  >
                    Logout
                  </Button>
                </a>
              </Link>
            </NavItem>
          ) : (
            <NavItem>
              <Link href="/signup">
                <a className="nav-link">
                  <Button>Sign up</Button>
                </a>
              </Link>
            </NavItem>
          )}
        </Nav>
      </header>
      <Container>
        <main>{children}</main>
      </Container>
      <footer>&copy; 2021. FoodApp. All rights reserved.</footer>
    </>
  );
}
