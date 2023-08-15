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
  const teamName = history.location.state.teamName;
  var paginationRange = usePagination(
    employeeCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  const back = () => {
    history.push("/admin/job", { teamName: teamName });
  }

  useEffect(() => {
    axios.get("http://localhost:8080/recommend/job/" + jobId, {headers: {"Origin": "http://localhost:3000"}}).then(res => {
      setEmployees(res.data);
      setEmployeeCount(res.data.length);
      setPageState(Math.ceil(res.data.length / pageSize));
      setLoading(false);
    });
  }, []);

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

  const handlePagination = (e, currentPage) => {
    e.preventDefault();
    setCurrentState(currentPage);
  };

  if (isLoading) {
    return <div className="content">Loading...</div>
  }

  return (
    <div className="content">
      <Row>
        <Col><Label>{teamName + ' > Job > ' + jobId + ' > Candidate'}</Label></Col>
      </Row>
      <Row>
        <Col md="1" />
        <Col md="1">
          <Button onClick={() => back()}>Back</Button>
        </Col>
        <Col />
        <Col />
      </Row>
      <Row>
        <Col md="1" />
        <Col md="10" sm="12" className="content-card">
          <Card className="demo-icons">
            <CardBody>
              {employees.length > 0 ? employees
                .slice(currentState * pageSize, (currentState + 1) * pageSize)
                .map((employee, index) => {
                  return (
                    <Row className="employee-row">
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
                      <Col>
                        <Row>
                          <label>Fullname</label>
                        </Row>
                        <Row>
                          <Label className="employee-text">{employee.name}</Label>
                        </Row>
                        <Row>
                          <label>Id</label>
                        </Row>
                        <Row>
                          <Label className="employee-text">{employee.id}</Label>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <label>Title</label>
                        </Row>
                        <Row>
                          <Label className="employee-text">{employee.title}</Label>
                        </Row>
                        <Row>
                          <label>Direct report</label>
                        </Row>
                        <Row>
                          <Label className="employee-text">{employee.superiorName}</Label>
                        </Row>
                        <Row className="button-row">
                          <Button className="float-right" onClick={() => createEmployee()}>View skills</Button> 
                          <Button className="float-right" onClick={() => createEmployee()}>Match job</Button> 
                        </Row>
                      </Col>
                    </Row>
                  )
                }) : "No candidate available"}
              {renderPagination()}
            </CardBody>
          </Card>
        </Col>
        <Col md="1" />
      </Row >
    </div >
  );
};

const createEmployee = () => {

}

export default StaffCandidate;
