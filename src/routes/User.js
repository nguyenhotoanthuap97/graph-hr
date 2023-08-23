import Directory from "views/Directory";
import Project from "views/Project";
import Skillsets from "views/Skillsets";

var routes = [
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
    path: "/project",
    name: "Project",
    icon: "nc-icon nc-chat-33",
    component: Project,
    layout: "/user"
  }
];
export default routes;