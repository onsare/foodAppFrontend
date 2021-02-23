import { useContext } from "react";
import { Button, Card, CardBody } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";

import appContext from "../../context/AppContext";

const Cart = () => {
  const AppContext = useContext(appContext);

  const router = useRouter();

  const {
    cart: { items, total },
    isAuthenticated,
    removeItem,
    addItem,
  } = AppContext;

  return (
    <div className="sticky-card">
      <Card>
        <CardBody>
          {items.length > 0 ? (
            <div>
              <table>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        {" "}
                        <Button color="danger" onClick={() => removeItem(item)}>
                          -
                        </Button>
                      </td>
                      <td> x{item.quantity}</td>
                      <td>
                        {" "}
                        <Button onClick={() => addItem(item)}>+</Button>
                      </td>
                      <td>Ksh. {item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2>Total: {total}</h2>
            </div>
          ) : (
            <p>Your cart is empty</p>
          )}
        </CardBody>
        <CardBody>
          {items.length ? (
            isAuthenticated ? (
              router.pathname === "/checkout" ? null : (
                <Link href="/checkout">
                  <Button>Order</Button>
                </Link>
              )
            ) : (
              <Link href="/signin">
                <Button>Login To Order</Button>
              </Link>
            )
          ) : null}
        </CardBody>
        <CardBody>
          {router.pathname === "/checkout" ? (
            <Link href="/">
              <Button>{"<"} restaurants</Button>
            </Link>
          ) : null}
        </CardBody>
      </Card>

      <style jsx>
        {`
          .sticky-card {
            position: sticky;
            top: 80px;
          }
        `}
      </style>
    </div>
  );
};

export default Cart;
