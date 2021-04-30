import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'
import Login from '../views/Login.vue'
import Pengaduan from '../views/Pengaduan.vue'
import Aspirasi from '../views/Aspirasi.vue'
import Petugas from '../views/Petugas.vue'
import Masyarakat from '../views/Masyarakat.vue'
import Kategori from '../views/Kategori.vue'
import Report from '../views/Report.vue'



Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    name: 'login',
    components: {default: Login},
  },
  {
    path: '/',
    name: 'home',
    components: {default: Home, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/pengaduan',
    name: 'pengaduan',
    components: {default: Pengaduan, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/aspirasi',
    name: 'aspirasi',
    components: {default: Aspirasi, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/petugas',
    name: 'petugas',
    components: {default: Petugas, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/masyarakat',
    name: 'masyarakat',
    components: {default: Masyarakat, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/kategori',
    name: 'kategori',
    components: {default: Kategori, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/report',
    name: 'report',
    components: {default: Report, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
