
import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { Card, CardBody, Row, Col, InputGroup, Input, InputGroupAddon, InputGroupText, Label, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useHistory } from "react-router-dom";

function Project() {
  const pageSize = 5;
  const siblingCount = 1;
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [filterText, setFilterText] = useState("");
  const history = useHistory();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  var paginationRange = usePagination(
    teamCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  const toJob = (projectName) => {
    history.push("/admin/project/job", { projectName: projectName });
  }

  const handlePagination = (e, currentPage) => {
    e.preventDefault();
    setCurrentState(currentPage);
  };

  const renderPagination = () => {
    if (paginationRange.length > 2) {
      return (
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
      )
    }
    return null;
  }

  const handleFilterTextChange = event => {
    let text = event.target.value;
    setFilterText(text);
    let showTeams = teams.filter(team => team.projectName.toLowerCase().includes(text.toLowerCase()));
    setFilteredTeams(showTeams);
    if (text === "") {
      setTeamCount(teams.length);
    } else {
      setTeamCount(showTeams.length);
    }
    setCurrentState(0);
  }

  useEffect(() => {
    console.log(SERVER_URL)
    axios.get(SERVER_URL + "/graph/team-info").then(res => {
      setTeams(res.data);
      setTeamCount(res.data.length)
      setPageState(Math.ceil(res.data.length / pageSize));
      setLoading(false);
    });
  }, [SERVER_URL]);

  if (isLoading) {
    return <div className="content">Loading...</div>
  }

  return (
    <div className="content">
      <Row>
        <Col md="1" />
        <Col md="12" className="content-card">
          <Card className="demo-icons">
            <CardBody>
              <Row>
                <Col md="9"></Col>
                <Col md="3">
                  <form>
                    <InputGroup className="no-border">
                      <Input placeholder="Filter by project name..." value={filterText} onChange={handleFilterTextChange} />
                      <InputGroupAddon addonType="append">
                      </InputGroupAddon>
                    </InputGroup>
                  </form>
                </Col>
              </Row>
              {(filterText === "" ? teams : filteredTeams)
                .slice(currentState * pageSize, (currentState + 1) * pageSize)
                .map((team, index) => {
                  return (
                    <Row>
                      <Col>
                        <Card>
                          <CardBody>
                            <Col md="12">
                              <Row>
                                <Col className="pr-1" md="2">
                                  <Row>
                                    <label>Project</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text ">{team.projectName}</Label>
                                  </Row>
                                  <Row>
                                    <label>Business unit</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{team.buName}</Label>
                                  </Row>
                                </Col>
                                <Col className="pr-1" md="2">
                                  <Row>
                                    <label>Current head count</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{team.occupantCount}</Label>
                                  </Row>
                                  <Row>
                                    <label>Vacancy</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{team.jobCount - team.occupantCount}</Label>
                                  </Row>
                                </Col>
                                <Col className="pr-1">
                                  <Row>
                                    <label>Description</label>
                                  </Row>
                                  <Row>
                                    <p className="description-textarea">{team.description}</p>
                                  </Row>
                                </Col>
                                <Col md="2">
                                  <Button className="float-right margin-btn" onClick={() => toJob(team.projectName)}>View positions</Button>
                                </Col>
                              </Row>
                            </Col>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  )
                })}
              {renderPagination()}
            </CardBody>
          </Card>
        </Col>
        <Col md="1" />
      </Row>
    </div>
  );

}

export default Project;
