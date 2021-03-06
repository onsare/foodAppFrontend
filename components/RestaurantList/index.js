import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardFooter,
  Col,
  Row,
} from "reactstrap";

const QUERY = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

function RestaurantList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading restaurants";
  if (loading) return <h2>Loading...</h2>;
  if (data.restaurants && data.restaurants.length) {
    //search query
    const searchQuery = data.restaurants.filter((query) => {
      return query.name.toLowerCase().includes(props.search);
    });
    if (searchQuery.length != 0) {
      return (
        <Row>
          {searchQuery.map((item) => (
            <Col xs="12" sm="6" md="4" key={item.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${item.image.url}`}
                />
                <CardBody style={{ height: 180, overflow: "hidden" }}>
                  <CardTitle>{item.name}</CardTitle>
                  <CardText>{item.description}</CardText>
                </CardBody>
                <CardFooter>
                  <Link
                    as={`/restaurants/${item.id}`}
                    href={`/restaurants?id=${item.id}`}
                  >
                    <a>
                      <Button>View</Button>
                    </a>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      );
    } else {
      return <h2>No restaurant(s) found</h2>;
    }
  }
}

export default RestaurantList;
