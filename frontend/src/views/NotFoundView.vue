<template>
    <div class="not-found">
      <h1>Erreur 404</h1>
      <p>Cette page n'existe pas ou a été déplacée.</p>

      <a href="/" class="btn btn-primary">Revenir à l'Accueil</a>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore.js'

export default {
  name: 'notFound',
  props: {
      msg: String
  },
  data() {
      return {}
  },
  setup() {
      const authStore = useAuthStore();
      return {
          authStore
      }
  },
  mounted() {
      this.authStore.isLogged();
  },
}
</script>