import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Point to Laravel backend on port 8000
axios.defaults.baseURL = 'http://pzi152026.studenti.sum.ba/backend/api'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const app = createApp(App)
app.use(router)
app.mount('#app')