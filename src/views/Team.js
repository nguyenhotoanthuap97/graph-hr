
import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { Card, CardBody, Row, Col, InputGroup, Input, InputGroupAddon, InputGroupText, FormGroup, Label, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";


function Team() {
  const pageSize = 5;
  const siblingCount = 1;
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [teams, setTeams] = useState();
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const history = useHistory();

  var paginationRange = usePagination(
    teamCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  const toJob = (teamName) => {
    console.log("Team: ", teamName)
    // history.push("/team", data);
  }

  const handlePagination = (e, currentPage) => {
    e.preventDefault();
    setCurrentState(currentPage);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/graph/team-info").then(res => {
      console.log("Team: ", res);
      setTeams(res.data);
      setTeamCount(res.data.length)
      setPageState(Math.ceil(res.data.length / pageSize));
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
        <Col md="10" className="content-card">
          <Card className="demo-icons">
            <CardBody>
              {teams
                .slice(currentState * pageSize, (currentState + 1) * pageSize)
                .map((team, index) => {
                return (
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <Col md="12">
                            <Row>
                              <Col className="pr-1" md="6">
                                <Row>
                                  <label>Team</label>
                                </Row>
                                <Row>
                                  <Label className="employee-text">{team.teamName}</Label>
                                </Row>
                              </Col>
                              <Col className="pr-1" md="6">
                                <Row>
                                  <label>Business unit</label>
                                </Row>
                                <Row>
                                  <Label className="employee-text">{team.buName}</Label>
                                </Row>
                              </Col>
                            </Row>
                            <Row className="button-row">
                              <Button className="float-right" onClick={() => toJob(team.teamName)}>View job</Button>
                            </Row>
                          </Col>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                )
              })}
              <Row>
                <Col xl="3" lg="2" md="1" sm="0" />
                <Col xl="6" lg="8" md="10" sm="12">
                  <Pagination aria-label="pagination">
                    <PaginationItem disabled={currentState <= 0}>
                      <PaginationLink
                        onClick={e => handlePagination(e, currentState - 1)}
                        previous
                        href="#"
                      />
                    </PaginationItem>
                    {console.log(paginationRange)}
                    {paginationRange.map((page, i) => {
                      if (page === DOTS) {
                        return (
                          <PaginationItem disabled={true}>
                            <PaginationLink href="#">
                              {DOTS}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      }
                      return (
                        <PaginationItem active={page === currentState + 1} key={page - 1}>
                          <PaginationLink onClick={e => handlePagination(e, page - 1)} href="#">
                            {page}
                          </PaginationLink>
                        </PaginationItem>)
                    })}

                    <PaginationItem disabled={currentState >= pageState - 1}>
                      <PaginationLink
                        onClick={e => handlePagination(e, currentState + 1)}
                        next
                        href="#"
                      />
                    </PaginationItem>
                  </Pagination>
                </Col>
                <Col xl="3" lg="2" md="1" sm="0" />
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="1" />
      </Row>
    </div>
  );

}

export default Team;
