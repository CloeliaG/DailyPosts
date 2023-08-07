<template>
  <div class="container-fluid">
    <header class="d-flex flex-wrap justify-content-between py-3 px-4 border-bottom">
      <RouterLink
        :to="{
          name: 'home'
        }"
        class="d-flex align-items-center gap-2 mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none text-primary"
      >
        <i class="fa-solid fa-envelopes-bulk fa-2x" />
        <span class="fs-3">DailyPosts</span>
      </RouterLink>
      <ul class="nav nav-pills gap-2">
        <li class="nav-item">
          <RouterLink to="/" exact-active-class="active" active-class="active" class="nav-link">
            <i class="fa-solid fa-house mx-1" />Home
          </RouterLink>
        </li>

        <li v-if="isAuthenticated" class="nav-item">
          <RouterLink
            exact-active-class="active"
            active-class="active"
            to="/posts"
            class="nav-link"
          >
            <i class="fa-solid fa-pen-to-square mx-1"></i>Posts
          </RouterLink>
        </li>

        <li v-if="!isAuthenticated" class="nav-item">
          <RouterLink
            exact-active-class="active"
            active-class="active"
            to="/signup"
            class="nav-link"
          >
            <i class="fa-solid fa-user-plus mx-1"></i>Inscription
          </RouterLink>
        </li>

        <li v-if="!isAuthenticated" class="nav-item">
          <RouterLink
            exact-active-class="active"
            active-class="active"
            to="/signin"
            class="nav-link"
          >
            <i class="fa-solid fa-right-to-bracket mx-1"></i>Connexion
          </RouterLink>
        </li>

        <li v-if="isAuthenticated" class="nav-item">
          <button @click="logout" class="nav-link">
            <i class="fa-solid fa-sign-out mx-1"></i>Déconnexion
          </button>
        </li>
      </ul>
    </header>

    <main class="container main-router-container">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from './stores/authStore.js'

export default {
  name: 'App',
  computed: {
    ...mapState(useAuthStore, ['auth', 'isAuthenticated']),
    username() {
      return this.user.username
    },
  },
  methods: {
    ...mapActions(useAuthStore, ['signOut', 'isLogged']),
    logout() {
      this.signOut()
      this.$router.push({ name: 'signin' })
    }
  },
}
</script>

<style scoped></style>
