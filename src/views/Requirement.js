
import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { Card, CardBody, Row, Col, InputGroup, Input, InputGroupAddon, InputGroupText, Label, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Requirement() {
  const pageSize = 5;
  const siblingCount = 1;
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [requirementCount, setRequirementCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [requirements, setRequirements] = useState();
  const history = useHistory();
  const teamName = history.location.state.teamName;
  const jobId = history.location.state.jobId;

  var paginationRange = usePagination(
    requirementCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  const back = () => {
    history.push("/admin/job", { teamName: teamName });
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

  useEffect(() => {
    axios.get("http://localhost:8080/graph/job/requirement?jobId=" + jobId, {headers: {"Origin": "http://localhost:3000"}}).then(res => {
      console.log("Jobs: ", res);
      setRequirements(res.data);
      setRequirementCount(res.data.length)
      setPageState(Math.ceil(res.data.length / pageSize));
      setLoading(false);
    });
  }, [jobId]);

  if (isLoading) {
    return <div className="content">Loading...</div>
  }

  return (
    <div className="content">
      <Row>
        <Col><Label>{teamName + ' > Job > ' + jobId}</Label></Col>
      </Row>
      <Row>
        <Col md="1" />
        <Col>
          <Button onClick={() => back()}>Back</Button>
        </Col>
        <Col />
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
          <Card className="demo-icons requirement">
            <CardBody>
              <Row>
                <Col>
                  <Row>
                    <label>Title</label>
                  </Row>
                  <Row>
                    <Label className="employee-text">{requirements[0].jobName}</Label>
                  </Row>
                </Col>
              </Row>
              <Row>
                <label>Stack</label>
              </Row>
              <Card>
                <CardBody>
                  {requirements
                    .slice(currentState * pageSize, (currentState + 1) * pageSize)
                    .map((requirement, index) => {
                      console.log(requirement)
                      return (
                        <Card>
                          <CardBody>
                            <Row>
                              <Col md="2">
                                <Label className="employee-text">{requirement.skillName}</Label>
                              </Col>
                              <Col />
                              <Col md="1">
                                <Label>Require: </Label>
                                <Input disabled value={requirement.rating} />
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      )
                    })}
                </CardBody>
              </Card>
              {renderPagination()}
            </CardBody>
          </Card>
        </Col>
        <Col md="1" />
      </Row>
    </div>
  );

}

export default Requirement;
