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
import React from "react";

// reactstrap components
import { Card, CardBody, Row, Col, InputGroup, Input, InputGroupAddon, InputGroupText, FormGroup, Label } from "reactstrap";

function Team() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="6"></Col>
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
          <Col md="3">
            <FormGroup
              check
              inline
            >
              <Input type="checkbox" />
              <Label check>Show skills-matched teams only</Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardBody>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Col md="12">
                          <Row>
                            <Col className="pr-1" md="6">
                              <Row>
                              <FormGroup>
                                <label>Team</label>
                                <Input
                                  defaultValue="Active Trade"
                                  disabled
                                  type="text"
                                />
                              </FormGroup>
                              </Row>
                              <Row>
                              <FormGroup>
                                <label>Business Unit</label>
                                <Input
                                  defaultValue="AUS"
                                  disabled
                                  type="text"
                                />
                              </FormGroup>
                              </Row>
                            </Col>
                            <Col className="pr-1" md="6">
                              <FormGroup>
                                <label>Stacks</label>
                                <Input
                                  defaultValue="Java, Spring Boot, AWS"
                                  disabled
                                  type="textarea"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Col md="12">
                          <Row>
                            <Col className="pr-1" md="6">
                              <Row>
                              <FormGroup>
                                <label>Team</label>
                                <Input
                                  defaultValue="Digital Shock"
                                  disabled
                                  type="text"
                                />
                              </FormGroup>
                              </Row>
                              <Row>
                              <FormGroup>
                                <label>Business Unit</label>
                                <Input
                                  defaultValue="APAC"
                                  disabled
                                  type="text"
                                />
                              </FormGroup>
                              </Row>
                            </Col>
                            <Col className="pr-1" md="6">
                              <FormGroup>
                                <label>Stacks</label>
                                <Input
                                  defaultValue="Java, Spring Boot, AWS"
                                  disabled
                                  type="textarea"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Col md="12">
                          <Row>
                            <Col className="pr-1" md="6">
                              <Row>
                              <FormGroup>
                                <label>Team</label>
                                <Input
                                  defaultValue="Go Fund"
                                  disabled
                                  type="text"
                                />
                              </FormGroup>
                              </Row>
                              <Row>
                              <FormGroup>
                                <label>Business Unit</label>
                                <Input
                                  defaultValue="EU"
                                  disabled
                                  type="text"
                                />
                              </FormGroup>
                              </Row>
                            </Col>
                            <Col className="pr-1" md="6">
                              <FormGroup>
                                <label>Stacks</label>
                                <Input
                                  defaultValue="Java, Spring Boot, AWS"
                                  disabled
                                  type="textarea"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Col md="12">
                          <Row>
                            <Col className="pr-1" md="6">
                              <Row>
                              <FormGroup>
                                <label>Team</label>
                                <Input
                                  defaultValue="Digital Shock"
                                  disabled
                                  type="text"
                                />
                              </FormGroup>
                              </Row>
                              <Row>
                              <FormGroup>
                                <label>Business Unit</label>
                                <Input
                                  defaultValue="APAC"
                                  disabled
                                  type="text"
                                />
                              </FormGroup>
                              </Row>
                            </Col>
                            <Col className="pr-1" md="6">
                              <FormGroup>
                                <label>Stacks</label>
                                <Input
                                  defaultValue="Java, Spring Boot, AWS"
                                  disabled
                                  type="textarea"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Team;
