import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { Card, CardBody, Row, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Directory = () => {
  const DOTS = "...";
  const pageSize = 5;
  const siblingCount = 1;
  const [isLoading, setLoading] = useState(true);
  const [employees, setEmployees] = useState();
  const [employeeCount, setEmployeeCount] = useState(0);
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  var paginationRange = usePagination(
    employeeCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  useEffect(() => {
    axios.get("http://localhost:8080/graph/employee").then(res => {
      console.log("Employees: ", res);
      setEmployees(res.data);
      setEmployeeCount(res.data.length);
      setPageState(Math.ceil(res.data.length / pageSize));
      setLoading(false);
    });
  }, []);

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
        <Col md="1" />
      </Row>
      <Row>
        <Col md="1" />
        <Col md="10" sm="12" className="content-card">
          <Card className="demo-icons">
            <CardBody>
              {employees
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
                      <Col md="4">
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
                      </Col>
                      <Col md="4">
                        <Row>
                          <label>Direct report</label>
                        </Row>
                        <Row>
                          <Label className="employee-text">{employee.name}</Label>
                        </Row>
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
      </Row >
    </div >
  );
};

const range = (start, end) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
}

export default Directory;
