
import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { FormGroup, Input, Card, CardBody, Row, Col, Label, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function JobCandidate() {
  const pageSize = 5;
  const siblingCount = 1;
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [jobs, setJobs] = useState();
  const [vacantJobs, setVacantJobs] = useState([]);
  const [vacantOnly, setVacantOnly] = useState(true);
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
      let filteredJobs = res.data.filter(j => j.employee === "");
      setVacantJobs(filteredJobs);
      setJobCount(filteredJobs.length);
      setPageState(Math.ceil(res.data.length / pageSize));
      setLoading(false);
    });
  }, [SERVER_URL, employeeId]);

  const handlePagination = (e, currentPage) => {
    e.preventDefault();
    setCurrentState(currentPage);
  };

  const handleChange = (e) => {
    let onlyVacant = e.target.checked;
    setVacantOnly(onlyVacant);
    if (onlyVacant) {
      setJobCount(vacantJobs.length);
    } else {
      setJobCount(jobs.length);
    }
    setCurrentState(0);
  }
  
  const renderPagination = () => {
    if (paginationRange.length >= 2) {
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
        <Col md="1">
          <Button onClick={() => back()}>Back</Button>
        </Col>
        <Col />
        <Col md="2">
          <form>
            <FormGroup check className="checkbox-form">
              <Label check>
                <Input type="checkbox" defaultChecked={true} onChange={e => handleChange(e)}/>{' '}
                Show vacant jobs only
              </Label>
            </FormGroup>
          </form>
        </Col>
      </Row>
      <Row>
        <Col />
        <Col md="12" className="content-card">
          <Card className="demo-icons">
            <CardBody>
              {(vacantOnly ? vacantJobs : jobs).length > 0 ? (vacantOnly ? vacantJobs : jobs)
                .slice(currentState * pageSize, (currentState + 1) * pageSize)
                .map((job, index) => {
                  return (
                    <Row>
                      <Col>
                        <Card>
                          <CardBody>
                            <Col md="12">
                              <Row>
                                <Col className="pr-1" md="3">
                                  <Row>
                                    <label>ID</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.jobId}</Label>
                                  </Row>
                                  <Row>
                                    <label>Title</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.jobName}</Label>
                                  </Row>
                                </Col>
                                <Col className="pr-1" md="3">
                                  <Row>
                                    <label>Team</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.projectName}</Label>
                                  </Row>
                                  <Row>
                                    <label>Business Unit</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.buName}</Label>
                                  </Row>
                                </Col>
                                <Col className="pr-1" md="3">
                                <Row>
                                    <label>Stack</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.stack}</Label>
                                  </Row>
                                  <Row>
                                    <label>Occupant</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.employee === "" ? "-" : job.employee}</Label>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  )
                }) : "No candidate match"}
                {renderPagination()}
            </CardBody>
          </Card>
        </Col>
        <Col />
      </Row>
    </div>
  );

}

export default JobCandidate;
