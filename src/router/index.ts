import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import CreateLogView from '../views/CreateLogView.vue';
import HomeView from '../views/HomeView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes: Array<RouteRecordRaw> = [
  /* Main page */
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  /* Create new log page */
  {
    path: '/create',
    name: 'create',
    component: CreateLogView,
  },
  /* Route not found page */
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
