import { useContext } from "react";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardFooter,
  CardBody,
  CardText,
  CardImg,
  Button,
} from "reactstrap";
import AppContext from "../../context/AppContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function DishesList({ data }) {
  const appContext = useContext(AppContext);

  const { addItem } = appContext;

  return (
    <Row>
      {data.dishes.length > 0 ? (
        data.dishes.map((item) => (
          <Col xs="12" sm="6" md="4" key={item.id}>
            <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
              <CardImg src={`${API_URL}${item.image.url}`} />
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
              </CardBody>
              <CardFooter>
                <span>Ksh. {item.price}</span>{" "}
                <Button onClick={() => addItem(item)}>+ Add To Cart</Button>
              </CardFooter>
            </Card>
          </Col>
        ))
      ) : (
        <Col>
          <CardText>No dishes available in this restaurant yet</CardText>
        </Col>
      )}
    </Row>
  );
}

export default DishesList;
