import Link from "next/link";
import Head from "next/head";
import { Nav, NavItem, Container } from "reactstrap";

export default function Layout({ children }) {
  let title = "Food App";
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
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">FoodApp</a>
            </Link>
          </NavItem>
          <NavItem className="ml-auto">
            <Link href="/signin">
              <a className="nav-link">Sign in</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/signup">
              <a className="nav-link">Sign up</a>
            </Link>
          </NavItem>
        </Nav>
      </header>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
}
