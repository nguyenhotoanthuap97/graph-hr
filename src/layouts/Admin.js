/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";

import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Project from "views/Project";
import Directory from "views/Directory";

import routes from "routes/Admin";
import Job from "views/Job";
import Requirement from "views/Requirement";
import CreateJob from "views/CreateJob";
import StaffCandidate from "views/StaffCandidate";
import Rate from "views/Rate";
import CreateEmployee from "views/CreateEmployee";
import JobCandidate from "views/JobCandidate";

var ps;

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <Navbar {...props} />
        <Switch>
          <Route
            exact path="/admin/project"
            component={Project}
            key={0}
          />
          <Route
            exact path="/admin/job"
            component={Job}
            key={1}
          />
          <Route
            exact path="/admin/job/new"
            component={CreateJob}
            key={1}
          />
          <Route
            exact path="/admin/job/requirement"
            component={Requirement}
            key={1}
          />
          <Route
            exact path="/admin/job/candidate"
            component={StaffCandidate}
            key={1}
          />
          <Route
            exact path="/admin/employee"
            component={Directory}
            key={2}
          />
          <Route
            exact path="/admin/employee/skill"
            component={Rate}
            key={2}
          />
          <Route
            exact path="/admin/employee/new"
            component={CreateEmployee}
            key={2}
          />
          <Route
            exact path="/admin/employee/candidate"
            component={JobCandidate}
            key={2}
          />
        </Switch>
        <Footer fluid />
      </div>
    </div>
  );
}

export default Dashboard;
