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
import Directory from "views/Directory";
import Typography from "views/Typography.js";
import Skillsets from "views/Skillsets";
import UserPage from "views/User.js";

var routes = [
  {
    path: "/information", 
    name: "Information",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/user"
  },  
  {
    path: "/skillsets",
    name: "Skillsets",
    icon: "nc-icon nc-html5",
    component: Skillsets,
    layout: "/user"
  },
  {
    path: "/directory",
    name: "Directory",
    icon: "nc-icon nc-tile-56",
    component: Directory,
    layout: "/user"
  },
  {
    path: "/team",
    name: "Team",
    icon: "nc-icon nc-chat-33",
    component: Typography,
    layout: "/user"
  }
];
export default routes;
