import { createApp } from 'vue'
import { createPinia } from 'pinia'

// configure les defaults d'axios pour notre application
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

// intercepte les requêtes pour ajouter le token d'authentification
// Revoir comment ça fonctionne
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
});

import App from './App.vue'
import router from './router'

// import de notre propre css globale (format SCSS)
import './assets/main.scss'

const app = createApp(App)


app.use(createPinia())
app.use(router)

app.mount('#app')
