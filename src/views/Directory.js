import React from "react";

// reactstrap components
import { Card, CardBody, Row, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from "reactstrap";

function Directory() {
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
              <Label check>Show direct subordinates only</Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardBody>
                <Row>
                  <Col md="4">
                    <Card className="card-user">
                      <CardBody>
                        <div className="author">
                          <img
                            alt="..."
                            className="avatar border-gray"
                            src={require("assets/img/default-avatar.png")}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="8">
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Fullname</label>
                          <Input
                            defaultValue="Nguyễn Văn A"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Direct report</label>
                          <Input
                            defaultValue="Nguyễn Văn B"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            defaultValue="Software Engineer"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Team</label>
                          <Input
                            defaultValue="Digital Shock"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <Card className="card-user">
                      <CardBody>
                        <div className="author">
                          <img
                            alt="..."
                            className="avatar border-gray"
                            src={require("assets/img/default-avatar.png")}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="8">
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Fullname</label>
                          <Input
                            defaultValue="Nguyễn Văn A"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Direct report</label>
                          <Input
                            defaultValue="Nguyễn Văn B"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            defaultValue="Software Engineer"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Team</label>
                          <Input
                            defaultValue="Digital Shock"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
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

export default Directory;
