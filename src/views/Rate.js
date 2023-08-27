
import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { Card, CardBody, Row, Col, InputGroup, Input, InputGroupAddon, InputGroupText, Label, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Rating from "react-rating";

function Rate() {
  const pageSize = 5;
  const siblingCount = 1;
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [skills, setSkills] = useState();
  const history = useHistory();
  const employeeId = history.location.state.employeeId;
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  var paginationRange = usePagination(
    skillCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  const back = () => {
    history.push("/admin/employee");
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
    axios.get(SERVER_URL + "/graph/employee/rating?employeeId=" + employeeId).then(res => {
      setSkills(res.data);
      setSkillCount(res.data.length)
      setPageState(Math.ceil(res.data.length / pageSize));
      setLoading(false);
    });
  }, [SERVER_URL, employeeId]);

  if (isLoading) {
    return <div className="content">Loading...</div>
  }

  return (
    <div className="content">
      <Row>
        <Col><Label>{'Employee > ' + employeeId + ' > Skill'}</Label></Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => back()}>Back</Button>
        </Col>
      </Row>
      <Row>
      <Col />
        <Col md="12" className="content-card">
          <Card className="demo-icons requirement">
            <CardBody>
              <Row>
                <Col>
                  <Row>
                    <label>Name</label>
                  </Row>
                  <Row>
                    <Label className="employee-text">{skills[0].employeeName}</Label>
                  </Row>
                </Col>
              </Row>
              <Row>
                <label>Skill</label>
              </Row>
              <Card>
                <CardBody>
                  {skills
                    .slice(currentState * pageSize, (currentState + 1) * pageSize)
                    .map((skill, index) => {
                      return (
                        <Card>
                          <CardBody>
                            <Row>
                              <Col md="2">
                                <Label className="employee-text">{skill.skillName}</Label>
                              </Col>
                              <Col />
                              <Col md="2">
                                <Label>Expertise: </Label>
                                {/* <Input disabled value={skill.rating} /> */}
                                <Rating className="rating-element" initialRating={skill.rating} readonly={true} emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" />
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
        <Col />
      </Row>
    </div>
  );

}

export default Rate;
