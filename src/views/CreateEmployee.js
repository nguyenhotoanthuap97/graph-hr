
import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { Card, CardBody, Row, Col, FormGroup, Form, UncontrolledButtonDropdown, Dropdown, DropdownToggle, DropdownItem, DropdownMenu, InputGroup, Input, Label, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

function CreateEmployee() {
  const pageSize = 5;
  const siblingCount = 1;
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [skills, setSkills] = useState();
  const [chosenRating, setChosenRating] = useState({});
  const history = useHistory();
  const forceUpdate = useForceUpdate();

  var paginationRange = usePagination(
    skillCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  const back = () => {
    history.push("/admin/employee");
  }

  const chooseRating = (skill, rating) => {
    chosenRating[skill] = rating;
    console.log(skill, rating, chosenRating);
    forceUpdate();
  }

  const getRating = (skill) => {
    return chosenRating[skill.name] === undefined ? 0 : chosenRating[skill.name];
  }

  const createEmployee = () => {

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
    axios.get("http://localhost:8080/graph/skill").then(res => {
      setSkills(res.data);
      setSkillCount(res.data.length)
      setPageState(Math.ceil(res.data.length / pageSize));
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="content">Loading...</div>
  }

  return (
    <div className="content">
      <Row>
        <Col><Label>{'New Employee'}</Label></Col>
      </Row>
      <Row>
        <Col md="1" />
        <Col md="1">
          <Button onClick={() => back()}>Back</Button>
        </Col>
        <Col />
        <Col md="1">
          <Button onClick={() => createEmployee()}>Create</Button>
        </Col>
        <Col md="1"></Col>
      </Row>
      <Row>
        <Col md="1" />
        <Col md="10" className="content-card">
          <Card className="demo-icons requirement">
            <CardBody>
              <Row>
              <Col md="1" />
                <Col className="pr-1" md="4">
                  <FormGroup>
                    <label>Fullname</label>
                    <Input
                      placeholder="Fullname..."
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col />
                <Col className="pr-1" md="4">
                  <FormGroup>
                    <label>Sex</label>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="sex-radio" checked/> Male
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="sex-radio" /> Female
                      </Label>
                    </FormGroup>
                  </FormGroup>
                </Col>
                <Col md="1"/>
              </Row>
              <Row>
                <Col md="1" />
                <Col className="pr-1" md="4">
                  <FormGroup>
                    <label>Date of birth</label>
                    <Input
                      placeholder="dd/mm/yyyy..."
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col />
                <Col className="pr-1" md="4">
                  <FormGroup>
                    <label>Title</label>
                    <Input type="select" name="select" id="rating-select">
                      <option>Software Engineer</option>
                      <option>Solution Architect</option>
                      <option>Senior Software Engineer</option>
                      <option>Senior Quality Assurance</option>
                      <option>Quality Assurance</option>
                      <option>Senior Business Analyst</option>
                      <option>Business Analyst</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="1" />
              </Row>
              <Row>
                <Col md="1" />
                <Col className="pr-1" md="4">
                  <FormGroup>
                    <label>Personal Income Tax number</label>
                    <Input
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col />
                <Col className="pr-1" md="4">
                  <FormGroup>
                    <label>Hometown</label>
                    <Input
                      placeholder="Ho Chi Minh..."
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md="1" />
              </Row>
              <Row>
                <Col md="1" />
                <Col className="pr-1" md="4">
                  <FormGroup>
                    <label>Social Insurance Book Number</label>
                    <Input
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col />
                <Col className="pr-1" md="4">
                  <FormGroup>
                    <label>National ID</label>
                    <Input
                      placeholder="352xxxxxx..."
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md="1" />
              </Row>
              <Row>
                <label>Skillsets</label>
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
                                <Label className="employee-text">{skill.name}</Label>
                              </Col>
                              <Col />
                              <Col md="1">
                                <Label>Require: </Label>
                                <InputGroup>
                                  <UncontrolledButtonDropdown>
                                    <Input disabled value={getRating(skill)} className="title-input" />
                                    <DropdownToggle outline split className="title-toggle" />
                                    <DropdownMenu>
                                      <DropdownItem onClick={() => chooseRating(skill.name, 0)}>0</DropdownItem>
                                      <DropdownItem onClick={() => chooseRating(skill.name, 1)}>1</DropdownItem>
                                      <DropdownItem onClick={() => chooseRating(skill.name, 2)}>2</DropdownItem>
                                      <DropdownItem onClick={() => chooseRating(skill.name, 3)}>3</DropdownItem>
                                      <DropdownItem onClick={() => chooseRating(skill.name, 4)}>4</DropdownItem>
                                      <DropdownItem onClick={() => chooseRating(skill.name, 5)}>5 </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledButtonDropdown>
                                </InputGroup>
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

export default CreateEmployee;
