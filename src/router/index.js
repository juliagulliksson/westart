import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard/Dashboard";
import Schedule from "@/components/Schedule/Schedule";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "DashBoard",
      component: Dashboard
    },
    {
      path: "/Schedule",
      name: "Schedule",
      component: Schedule
    }
  ]
});
