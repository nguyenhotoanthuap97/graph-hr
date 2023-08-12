import Team from "views/Team";
import Employee from "views/Directory";

var routes = [
  {
    path: "/team",
    name: "Team",
    icon: "nc-icon nc-chart-bar-32", //nucleo-icons
    component: Team,
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
