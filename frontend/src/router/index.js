import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/PostViews.vue')
    },
    {
      path: '/newPost',
      name: 'newPost',
      component: () => import('../views/NewPost.vue')
    },
    {
      path: '/post/:id',
      name: 'UpdatePost',
      props: true,
      component: () => import('../views/NewPost.vue')
    },
    // Nous ajoutons ici une route avec une expression régulière pour gérer les erreurs de navigation
    // ATTTENTION À BIEN METTRE CETTE ROUTE EN DERNIER DANS LE TABLEAU DU ROUTER
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
