
import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { Card, CardBody, Row, Col, Label, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function JobCandidate() {
  const pageSize = 5;
  const siblingCount = 1;
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [jobs, setJobs] = useState();
  const history = useHistory();
  const employeeId = history.location.state.employeeId;
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  var paginationRange = usePagination(
    jobCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  const back = () => {
    history.push("/admin/employee");
  }

  useEffect(() => {
    axios.get(SERVER_URL + "/recommend/employee/" + employeeId).then(res => {
      setJobs(res.data);
      setJobCount(res.data.length);
      setPageState(Math.ceil(res.data.length / pageSize));
      setLoading(false);
    });
  }, [SERVER_URL, employeeId]);

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

  if (isLoading) {
    return <div className="content">Loading...</div>
  }

  return (
    <div className="content">
      <Row>
        <Col><Label>{"Employee > " + employeeId + ' > Job candidate'}</Label></Col>
      </Row>
      <Row>
        <Col md="1" />
        <Col md="1">
          <Button onClick={() => back()}>Back</Button>
        </Col>
        <Col />
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
                              <Row>
                                <Col className="pr-1" md="6">
                                  <Row>
                                    <label>Team</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.teamName}</Label>
                                  </Row>
                                </Col>
                                <Col className="pr-1" md="6">
                                  <Row>
                                    <label>Business Unit</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.buName}</Label>
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
                {renderPagination()}
            </CardBody>
          </Card>
        </Col>
        <Col md="1" />
      </Row>
    </div>
  );

}

export default JobCandidate;
