import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Admin from '../views/Admin.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/project/:id', component: ProjectDetail },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
