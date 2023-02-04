/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Button,
  FormGroup,
  Form
} from "reactstrap";

function Skillsets() {

  return (
    <>
      <div className="content">
        <Row>
          <Col md="2">
            <Button
              type="button"
            >
              Save
            </Button>
          </Col>
          <Col md="7"></Col>
          <Col md="3">
            <form>
              <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Ongoing</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Skill/Stack</th>
                      <th>Rating</th>
                      <th>Primary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Backend</td>
                      <td>
                        <Col>
                          <FormGroup>
                            <Input type="select" name="select" id="rating-select">
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </td>
                      <td>
                        <Form>
                          <FormGroup
                            check
                            inline
                          >
                            <Input type="checkbox" />
                          </FormGroup>
                        </Form>
                      </td>
                    </tr>
                    <tr>
                      <td>Java</td>
                      <td>
                        <Col>
                          <FormGroup>
                            <Input type="select" name="select" id="rating-select">
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </td>
                      <td>
                        <Form>
                          <FormGroup
                            check
                            inline
                          >
                            <Input type="checkbox" />
                          </FormGroup>
                        </Form>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">New</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Skill/Stack</th>
                      <th>Rating</th>
                      <th>Primary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>JavaFX</td>
                      <td>
                        <Col>
                          <FormGroup>
                            <Input type="select" name="select" id="rating-select">
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </td>
                      <td>
                        <Form>
                          <FormGroup
                            check
                            inline
                          >
                            <Input type="checkbox" />
                          </FormGroup>
                        </Form>
                      </td>
                    </tr>
                    <tr>
                      <td>CSS</td>
                      <td>
                        <Col>
                          <FormGroup>
                            <Input type="select" name="select" id="rating-select">
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </td>
                      <td>
                        <Form>
                          <FormGroup
                            check
                            inline
                          >
                            <Input type="checkbox" />
                          </FormGroup>
                        </Form>
                      </td>
                    </tr>
                    <tr>
                      <td>Assembly</td>
                      <td>
                        <Col>
                          <FormGroup>
                            <Input type="select" name="select" id="rating-select">
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </td>
                      <td>
                        <Form>
                          <FormGroup
                            check
                            inline
                          >
                            <Input type="checkbox" />
                          </FormGroup>
                        </Form>
                      </td>
                    </tr>
                    <tr>
                      <td>Assembly</td>
                      <td>
                        <Col>
                          <FormGroup>
                            <Input type="select" name="select" id="rating-select">
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </td>
                      <td>
                        <Form>
                          <FormGroup
                            check
                            inline
                          >
                            <Input type="checkbox" />
                          </FormGroup>
                        </Form>
                      </td>
                    </tr>
                    <tr>
                      <td>Assembly</td>
                      <td>
                        <Col>
                          <FormGroup>
                            <Input type="select" name="select" id="rating-select">
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </td>
                      <td>
                        <Form>
                          <FormGroup
                            check
                            inline
                          >
                            <Input type="checkbox" />
                          </FormGroup>
                        </Form>
                      </td>
                    </tr>
                    <tr>
                      <td>Assembly</td>
                      <td>
                        <Col>
                          <FormGroup>
                            <Input type="select" name="select" id="rating-select">
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </td>
                      <td>
                        <Form>
                          <FormGroup
                            check
                            inline
                          >
                            <Input type="checkbox" />
                          </FormGroup>
                        </Form>
                      </td>
                    </tr>
                    <tr>
                      <td>Assembly</td>
                      <td>
                        <Col>
                          <FormGroup>
                            <Input type="select" name="select" id="rating-select">
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </td>
                      <td>
                        <Form>
                          <FormGroup
                            check
                            inline
                          >
                            <Input type="checkbox" />
                          </FormGroup>
                        </Form>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Skillsets;
