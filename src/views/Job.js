
import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { Card, CardBody, Row, Col, InputGroup, Input, InputGroupAddon, InputGroupText, Label, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Job() {
  const pageSize = 5;
  const siblingCount = 1;
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [jobs, setJobs] = useState();
  const history = useHistory();
  const teamName = history.location.state.data;

  console.log("Project: ", history.location.state.data);

  var paginationRange = usePagination(
    jobCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  const handlePagination = (e, currentPage) => {
    e.preventDefault();
    setCurrentState(currentPage);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/graph/job?teamName=" + teamName).then(res => {
      console.log("Jobs: ", res);
      setJobs(res.data);
      setJobCount(res.data.length)
      setPageState(Math.ceil(res.data.length / pageSize));
      setLoading(false);
    });
  }, [teamName]);

  if (isLoading) {
    return <div className="content">Loading...</div>
  }

  return (
    <div className="content">
      <Row>
        <Col><Label>{teamName + ' > Job'}</Label></Col>
        <Col md="5"></Col>
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
              {jobs
                .slice(currentState * pageSize, (currentState + 1) * pageSize)
                .map((job, index) => {
                  return (
                    <Row>
                      <Col>
                        <Card>
                          <CardBody>
                            <Col md="12">
                              <Row>
                                <Col className="pr-1" md="6">
                                  <Row>
                                    <label>ID</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.jobId}</Label>
                                  </Row>
                                </Col>
                                <Col className="pr-1" md="6">
                                  <Row>
                                    <label>Title</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.jobName}</Label>
                                  </Row>
                                </Col>
                              </Row>
                              <Row className="button-row">
                                <Button className="float-right" >View requirement</Button>
                                <Button className="float-right" >Candidate</Button>
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

export default Job;
