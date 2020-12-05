import Vue from "vue";
import VueRouter from "vue-router";

import Users from "@/views/Users";
import Create from "@/views/Create";
import Edit from "@/views/Edit";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Users",
    component: Users,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: Edit,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
