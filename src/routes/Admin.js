import Project from "views/Project";
import Employee from "views/Directory";

var routes = [
  {
    path: "/employee",
    name: "Employee",
    icon: "nc-icon nc-single-02",
    component: Employee,
    layout: "/admin"
  },
  {
    path: "/project",
    name: "Project",
    icon: "nc-icon nc-single-copy-04", //nucleo-icons
    component: Project,
    layout: "/admin"
  }
];
export default routes;
