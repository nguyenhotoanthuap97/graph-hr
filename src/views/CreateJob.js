
import React, { useEffect, useState } from "react";
import { usePagination, DOTS } from "utilities/usePagination";
import axios from "axios";

// reactstrap components
import { Card, CardBody, Row, Col, DropdownMenu, DropdownItem, Input, DropdownToggle, Label, Button, Pagination, PaginationItem, PaginationLink, UncontrolledButtonDropdown, InputGroup, Spinner, Modal, ModalBody } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

function CreateJob() {
  const pageSize = 5;
  const siblingCount = 1;
  const [pageState, setPageState] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [skills, setSkills] = useState();
  const [chosenTitle, setChosenTitle] = useState("Software Engineer");
  const [chosenRating, setChosenRating] = useState({});
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const projectName = history.location.state.projectName;
  const forceUpdate = useForceUpdate();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  var paginationRange = usePagination(
    skillCount,
    pageSize,
    siblingCount,
    currentState + 1
  );

  const back = () => {
    history.push("/admin/project/job", {projectName: projectName});
  }
  
  const createJob = async () => {
    setModal(true);
    let requires = [];
    for (var skill in chosenRating) {
      if (chosenRating.hasOwnProperty(skill) && chosenRating[skill] !== 0) {
        let require = {
          "skillName": skill,
          "rating": chosenRating[skill]
        };
        requires.push(require);
      }
    }
    let requestBody = {
      "name": chosenTitle,
      "projectName": projectName,
      "requires": requires
    }
    axios.post(SERVER_URL + "/graph/job", requestBody).then(res => {
      setModal(false);
      history.push("/admin/project/job/candidate", {jobId: res.data, projectName: projectName})
    })
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

  const chooseTitle = (title) => {
    setChosenTitle(title);
  }
  
  const chooseRating = (skill, rating) => {
    chosenRating[skill] = rating;
    forceUpdate();
  }

  const getRating = (skill) => {
    return chosenRating[skill.name] === undefined ? 0 : chosenRating[skill.name];
  }

  useEffect(() => {
    axios.get(SERVER_URL + "/graph/skill").then(res => {
      setSkills(res.data);
      setSkillCount(res.data.length)
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
        <Col md="1">
          <Button className="float-right" onClick={() => createJob()}>Create</Button>
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
                    <label>Title</label>
                    <InputGroup>
                      <UncontrolledButtonDropdown>
                        <Input disabled value={chosenTitle} className="title-input" />
                        <DropdownToggle outline split className="title-toggle" />
                        <DropdownMenu>
                          <DropdownItem onClick={() => chooseTitle("Software Engineer")}>Software Engineer</DropdownItem>
                          <DropdownItem onClick={() => chooseTitle("Solution Architect")}>Solution Architect</DropdownItem>
                          <DropdownItem onClick={() => chooseTitle("Senior Software Engineer")}>Senior Software Engineer</DropdownItem>
                          <DropdownItem onClick={() => chooseTitle("Senior Quality Assurance")}>Senior Quality Assurance</DropdownItem>
                          <DropdownItem onClick={() => chooseTitle("Quality Assurance")}>Quality Assurance</DropdownItem>
                          <DropdownItem onClick={() => chooseTitle("Senior Business Analyst")}>Senior Business Analyst</DropdownItem>
                          <DropdownItem onClick={() => chooseTitle("Business Analyst")}>Business Analyst</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </InputGroup>
                  </Row>
                </Col>
              </Row>
              <Row>
                <label>Stack</label>
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
                              <Col md="5" xl="2">
                                <Label className="employee-text">{skill.name}</Label>
                              </Col>
                              <Col />
                              <Col md="5" xl="2">
                                <Label>Require: </Label>
                                <InputGroup>
                                  <UncontrolledButtonDropdown>
                                    <Input disabled value={getRating(skill)} className="title-input rating-dropdown" />
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
        <Col />
      </Row>
      <Modal isOpen={modal}
        modalTransition={{ timeout: 100 }}>
        <ModalBody>
          <Label>Job initializing</Label>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </ModalBody>
      </Modal>
    </div>
  );

}

export default CreateJob;
