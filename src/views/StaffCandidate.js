import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { Button, Card, CardBody, Row, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const StaffCandidate = () => {
  const pageSize = 5;
  const siblingCount = 1;
  const [isLoading, setLoading] = useState(true);
  const [employees, setEmployees] = useState();
  const [employeeCount, setEmployeeCount] = useState(0);
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const history = useHistory();
  const jobId = history.location.state.jobId;
  const projectName = history.location.state.projectName;
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  var paginationRange = usePagination(
    employeeCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  const back = () => {
    history.push("/admin/project/job", { projectName: projectName });
  }

  useEffect(() => {
    axios.get(SERVER_URL + "/recommend/job/" + jobId).then(res => {
      setEmployees(res.data);
      setEmployeeCount(res.data.length);
      setPageState(Math.ceil(res.data.length / pageSize));
      setLoading(false);
    });
  }, [SERVER_URL]);

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

  const removeAccent = (name) => {
    return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const extractEmail = name => {
    let words = removeAccent(name.toLowerCase()).split(" ");
    let email = words[words.length - 1];
    let count = words.length - 2;
    while (count > 0) {
      email += words[count][0];
      count--;
    }
    email += words[0];
    return email;
  }

  const handlePagination = (e, currentPage) => {
    e.preventDefault();
    setCurrentState(currentPage);
  };

  if (isLoading) {
    return <div className="content loading">Loading...</div>
  }

  return (
    <div className="content">
      <Row>
        <Col><Label>{projectName + ' > Job > ' + jobId + ' > Candidate'}</Label></Col>
      </Row>
      <Row>
        <Col md="1">
          <Button onClick={() => back()}>Back</Button>
        </Col>
      </Row>
      <Row>
      <Col />
        <Col md="12" sm="12" className="content-card">
          <Card className="demo-icons">
            <CardBody>
              {employees.length > 0 ? employees
                .slice(currentState * pageSize, (currentState + 1) * pageSize)
                .map((employee, index) => {
                  return (
                    <Row className="employee-row">
                      <Col lg="12" xl="3">
                        <Card className="card-user">
                          <div className="author">
                            <img
                              alt="..."
                              className="avatar border-gray"
                              src={require("assets/img/avatars/avatar" + ((employee.id % 9) + 1) + ".jpg")}
                            />
                          </div>
                        </Card>
                      </Col>
                      <Col xs="12" sm="5" md="5" lg="5" xl="2" className="card-text-block">
                        <Row>
                          <label>Fullname</label>
                        </Row>
                        <Row>
                          <Label className="employee-text">{employee.name}</Label>
                        </Row>
                        <Row>
                          <label>Title</label>
                        </Row>
                        <Row>
                          <Label className="employee-text">{employee.title}</Label>
                        </Row>
                        <Row>
                          <label>Id</label>
                        </Row>
                        <Row>
                          <Label className="employee-text">{employee.id < 10 ? "000" + employee.id : employee.id < 100 ? "00" + employee.id : employee.id < 1000 ? "0" + employee.id : employee.id}</Label>
                        </Row>
                      </Col>
                      <Col xs="12" sm="5" md="5" lg="5" xl="2" className="card-text-block">
                        <Row>
                          <label>Project</label>
                        </Row>
                        <Row>
                          <Label className="employee-text">{employee.projectName === "" ? "- On Bench -" : employee.projectName}</Label>
                        </Row>
                        <Row>
                          <label>Department</label>
                        </Row>
                        <Row>
                          <Label className="employee-text">{employee.buName === "" ? "-" : employee.buName}</Label>
                        </Row>
                        <Row>
                          <label>Direct report</label>
                        </Row>
                        <Row>
                          <Label className="employee-text">{employee.superiorName === "" ? "-" : employee.superiorName}</Label>
                        </Row>
                      </Col>
                      <Col xs="12" sm="5" md="5" lg="5" xl="2" className="card-text-block">
                        <Row>
                          <label>Email</label>
                        </Row>
                        <Row>
                          <Label className="employee-text"><i className="nc-icon nc-email-85" />{extractEmail(employee.name) + "@graphhr.com"}</Label>
                        </Row>
                        <Row>
                          <label>Phone</label>
                        </Row>
                        <Row>
                          <Label className="employee-text"><i className="nc-icon nc-mobile" />{"0" + employee.sibn}</Label>
                        </Row>
                      </Col>
                    </Row>
                  )
                }) : "No candidate match"}
              {renderPagination()}
            </CardBody>
          </Card>
        </Col>
        <Col />
      </Row >
    </div >
  );
};
export default StaffCandidate;
