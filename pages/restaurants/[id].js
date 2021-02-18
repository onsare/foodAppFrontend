import Link from "next/link";
import { useRouter } from "next/router";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardBody,
  CardText,
  CardImg,
  Button,
} from "reactstrap";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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
      <div>
        <Row>
          <Col md="10">
            <Card>
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
                <Row>
                  {restaurant.dishes.length > 0 ? (
                    restaurant.dishes.map((item) => (
                      <Col xs="12" sm="6" md="4">
                        <Card key={item.id}>
                          <CardImg src={`${API_URL}${item.image.url}`} />
                          <CardBody>
                            <CardTitle>{item.name}</CardTitle>
                            <CardText>{item.description}</CardText>
                          </CardBody>
                          <CardFooter>
                            <Button>Add To Cart</Button>
                          </CardFooter>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Col>
                      <CardText>
                        No dishes available in this restaurant yet
                      </CardText>
                    </Col>
                  )}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Restaurants;
