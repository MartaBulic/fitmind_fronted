import { createRouter, createWebHistory } from 'vue-router'

// Regular imports
import HomePage from '../views/HomePage.vue'

// Lazy-loaded imports
const UserDashboard = () => import('../views/UserDashboard.vue')
const NutritionistDashboard = () => import('../views/NutritionistDashboard.vue')
const AdminDashboard = () => import('../views/AdminDashboard.vue')
const ContactPage = () => import('../views/ContactPage.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/nutritionist/dashboard',
    name: 'NutritionistDashboard',
    component: NutritionistDashboard,
    meta: { requiresAuth: true, role: 'nutritionist' }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'superadmin' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (to.meta.requiresAuth && !token) {
    // Ako ruta zahtijeva autentikaciju a nema token
    next('/')
  } else if (to.meta.role && user.role !== to.meta.role) {
    // Ako ruta zahtijeva specifičnu ulogu, a korisnik nema tu ulogu
    next('/dashboard')
  } else {
    next()
  }
})

export default router
