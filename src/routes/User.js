import Directory from "views/Directory";
import Team from "views/Team";
import Skillsets from "views/Skillsets";
import UserPage from "views/User";

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
    component: Team,
    layout: "/user"
  }
];
export default routes;