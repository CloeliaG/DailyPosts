<template>
    <h1>Inscription</h1>
    <div class="conatainer d-flex justify-content-center">
        <div class="row">
            <div class="col-12 mt-5">
                <form @submit.prevent="inscription">
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
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '@/stores/authStore.js'

export default {
    name: 'SignUp',
    computed: {
        ...mapState(useAuthStore, ['auth'])
    },
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(useAuthStore, ['signUp']),
        async inscription() {
            console.log(this.username, this.password);
            await this.signUp({ username: this.username, password: this.password });
            this.$router.push({ name: 'signin' });
        }
    }
}
</script>