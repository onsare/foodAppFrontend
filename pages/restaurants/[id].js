import { useRouter } from "next/router";
import { Row, Col, Card, CardHeader, CardBody, CardImg } from "reactstrap";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Cart from "../../components/cart";
import DishesList from "../../components/DishesList";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      description
      image {
        url
      }
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;
function Restaurants(props) {
  const router = useRouter();
  const { loading, data, error } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>An unexpected error occured</h2>;
  if (data.restaurant) {
    const { restaurant } = data;

    return (
      <Row>
        <Col md="9">
          <Card style={{ boxShadow: "none" }}>
            <CardHeader>
              <h1>{restaurant.name}</h1>
              <p>{restaurant.description}</p>
            </CardHeader>
            <CardImg
              style={{ height: 150, objectFit: "cover" }}
              src={`${API_URL}${restaurant.image.url}`}
            />

            <CardBody>
              <h2>Dishes</h2>

              <DishesList data={restaurant} />
            </CardBody>
          </Card>
        </Col>
        <Col md="3">
          <Cart />
        </Col>
      </Row>
    );
  }
}

export default Restaurants;
