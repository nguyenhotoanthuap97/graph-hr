import Project from "views/Project";
import Employee from "views/Directory";

var routes = [
  {
    path: "/project",
    name: "Project",
    icon: "nc-icon nc-chart-bar-32", //nucleo-icons
    component: Project,
    layout: "/admin"
  },
  {
    path: "/employee",
    name: "Employee",
    icon: "nc-icon nc-single-02",
    component: Employee,
    layout: "/admin"
  }
];
export default routes;
