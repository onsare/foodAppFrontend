import React, { useState } from "react";
import { Row, Col, Input, InputGroup, InputGroupAddon } from "reactstrap";
import RestaurantList from "../components/RestaurantList";

export default function Home() {
  const [query, updateQuery] = useState("");
  return (
    <div>
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              <InputGroupAddon addonType="append">Search</InputGroupAddon>
              <Input
                type="text"
                onChange={(e) =>
                  updateQuery(e.target.value.toLocaleLowerCase())
                }
                value={query}
              />
            </InputGroup>
          </div>
        </Col>
      </Row>

      <RestaurantList search={query} />
    </div>
  );
}
