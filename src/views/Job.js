
import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { FormGroup, Card, CardBody, Row, Col, Input, Label, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Job() {
  const pageSize = 5;
  const siblingCount = 1;
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [jobs, setJobs] = useState();
  const [vacantJobs, setVacantJobs] = useState([]);
  const [vacantOnly, setVacantOnly] = useState(false);
  const history = useHistory();
  const projectName = history.location.state.projectName;
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  var paginationRange = usePagination(
    jobCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  const back = () => {
    history.push("/admin/project");
  }
  
  const createJob = () => {
    history.push("/admin/project/job/new", {projectName: projectName});
  }

  const toCandidate = (jobId) => {
    history.push("/admin/project/job/candidate", {jobId: jobId, projectName: projectName})
  }

  const handlePagination = (e, currentPage) => {
    e.preventDefault();
    setCurrentState(currentPage);
  };

  const toRequirement = (projectName, jobId, jobName) => {
    history.push("/admin/project/job/requirement", { projectName: projectName, jobId: jobId, jobName: jobName });
  }

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

  useEffect(() => {
    axios.get(SERVER_URL + "/graph/job?teamName=" + projectName).then(res => {
      setJobs(res.data);
      let filteredJobs = res.data.filter(j => j.employee === "");
      setVacantJobs(filteredJobs);
      setJobCount(res.data.length);
      setPageState(Math.ceil(res.data.length / pageSize));
      setLoading(false);
    });
  }, [SERVER_URL, projectName]);

  if (isLoading) {
    return <div className="content">Loading...</div>
  }

  return (
    <div className="content">
      <Row>
        <Col><Label>{projectName + ' > Job'}</Label></Col>
      </Row>
      <Row>
        <Col md="1">
          <Button onClick={() => back()}>Back</Button>
        </Col>
        <Col />
        <Col md="2">
          <form>
            <FormGroup check className="checkbox-form float-right">
              <Label check>
                <Input type="checkbox" defaultChecked={false} onChange={e => handleChange(e)}/>{' '}
                Show vacant jobs only
              </Label>
            </FormGroup>
          </form>
        </Col>
        <Col md="2">
          <Button className="float-right v-button" onClick={() => createJob()}>Create job</Button>
        </Col>
      </Row>
      <Row>
      <Col />
        <Col md="12" className="content-card">
          <Card className="demo-icons">
            <CardBody>
              {(vacantOnly ? vacantJobs : jobs)
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
                                <Col className="pr-1" md="6">
                                  <Row>
                                    <label>Occupant</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.employee === "" ? "-" : job.employee}</Label>
                                  </Row>
                                  <Row>
                                    <label>Stack</label>
                                  </Row>
                                  <Row>
                                    <Label className="employee-text">{job.stack === "" ? "-TBD-" : job.stack}</Label>
                                  </Row>
                                </Col>
                                <Col className="float-right">
                                  <Row className="button-row float-right">
                                    <Button className="float-right large-v-button" onClick={() => toRequirement(projectName, job.jobId, job.jobName)}>View requirement</Button>
                                    <Button className="float-right large-v-button" onClick={() => toCandidate(job.jobId)}>Candidate</Button>
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
        <Col />
      </Row>
    </div>
  );

}

export default Job;
