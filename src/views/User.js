import React, {useEffect, useState} from "react";
import axios from "axios";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";

function User() {
  const [isLoading, setLoading] = useState(true);
  const [employees, setEmployees] = useState();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    axios.get(SERVER_URL + "/graph/employee").then(res => {
      console.log("Employees: ", res);
      setEmployees(res.data);
      setLoading(false);
    });
  });

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src={require("assets/img/damir-bosnjak.jpg")} />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/default-avatar.png")}
                    />
                    <h5 className="title">Thu Ho Toan Nguyen</h5>
                  </a>
                  <p className="description">Software Engineer</p>
                </div>
              </CardBody>
              <CardFooter>
                <div className="author">
                  <hr />
                  <p className="description">Developer</p>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="0">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="7">
                      <FormGroup>
                        <label>Date of birth</label>
                        <Input
                          defaultValue="12/11/1997"
                          disabled
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="5">
                      <FormGroup>
                        <label>Sex</label>
                        <Input
                          defaultValue="Male"
                          disabled
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>ID</label>
                        <Input
                          defaultValue="357890378"
                          disabled
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>PIT</label>
                        <Input
                          defaultValue="123456789"
                          disabled
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>SIBN</label>
                        <Input
                          defaultValue="512345684525"
                          disabled
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="123 Thành Thái, phường 14, quận 10, TPHCM"
                          disabled
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
