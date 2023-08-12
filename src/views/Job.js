
import React, { useEffect, useState } from "react";
import axios from "axios";

// reactstrap components
import { Card, CardBody, Row, Col, InputGroup, Input, InputGroupAddon, InputGroupText, FormGroup, Label, Button } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";

function Job() {
  const [isLoading, setLoading] = useState(true);
  const [teams, setTeams] = useState();
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const history = useHistory();

  const toJob = (teamName) => {
    history.push("/team?teamName=", {})
  }

  useEffect(() => {
    axios.get("http://localhost:8080/graph/team-info").then(res => {
      console.log("Team: ", res);
      setTeams(res.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="content">Loading...</div>
  }

  return (
    <div className="content">
      <Row>
        <Col md="8"></Col>
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
        <Col md="1"></Col>
      </Row>
      <Row>
      <Col md="1" />
        <Col md="10">
          <Card className="demo-icons">
            <CardBody>
              {teams.map((team, index) => {
                console.log(team.name);
                return (
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <Col md="12">
                            <Row>
                              <Col className="pr-1" md="6">
                                <Row>
                                  <FormGroup>
                                    <label>Team</label>
                                    <Input
                                      defaultValue={team.teamName}
                                      disabled
                                      type="text"
                                    />
                                  </FormGroup>
                                </Row>
                              </Col>
                              <Col className="pr-1" md="6">
                                <Row>
                                  <FormGroup>
                                    <label>Business Unit</label>
                                    <Input
                                      defaultValue={team.buName}
                                      disabled
                                      type="text"
                                    />
                                  </FormGroup>
                                </Row>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="10"></Col>
                              <Col md="2">
                                <Row>
                                  <Button>View job</Button>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                )
              })}
            </CardBody>
          </Card>
        </Col>
        <Col md="1" />
      </Row>
    </div>
  );

}

export default Job;
