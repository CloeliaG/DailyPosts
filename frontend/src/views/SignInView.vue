<template>
  <h1>Connexion</h1>
  <div class="conatainer d-flex justify-content-center">
    <div class="row">
      <div class="col-12 mt-5">
        <form @submit.prevent="connect">
          <div class="form-group my-2">
            <label for="exampleInputUsername">Username</label>
            <input v-model="username" type="texte" class="form-control" id="exampleInputUsername" aria-describedby="usernameHelp" placeholder="Enter username">
          </div>
          <div class="form-group my-2">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '@/stores/authStore.js'
import { useUserStore } from '@/stores/userStore.js'
export default {
  name: 'SignIn',
  computed: {
    ...mapState(useAuthStore, ['auth']),
    ...mapState(useUserStore, ['user'])
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['signIn']),
    ...mapActions(useUserStore, ['getUserByName']),
    async connect() {
      await this.signIn({ username: this.username, password: this.password })
      await this.getUserByName(this.username)
      this.$router.push({ name: 'posts' })
    }
  }
}
</script>