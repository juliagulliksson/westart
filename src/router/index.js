import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard/Dashboard";
import Schema from "@/components/Schema/Schema";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "DashBoard",
      component: Dashboard
    },
    {
      path: "/schema",
      name: "Schema",
      component: Schema
    }
  ]
});
