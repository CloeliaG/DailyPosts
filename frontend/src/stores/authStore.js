import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    currentUser: []
  }),
  actions: {
    async signIn({ username, password }) {
      try {
        const { data } = await axios.post('/signin', { username, password });
        const token = data.token;
        this.isAuthenticated = true;
        localStorage.setItem('token', token);
        const user = await axios.get(`/user/${username}`);
        this.currentUser = user.data;
      } catch (error) {
        this.isAuthenticated = false;
        localStorage.removeItem('token');
      }
    },
    async signUp({ username, password }) {
      try {
        await axios.post('/signup', { username, password });
      } catch (error) {
        console.log(error);
      }
    },
    async checkAuthenticated() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.post('/isAuth');
          this.isAuthenticated = response.data.isAuthenticated;
          this.currentUser = response.data.user;
        } catch (error) {
          this.isAuthenticated = false;
          localStorage.removeItem('token');
        }
      } else {
        this.isAuthenticated = false;
      }
    },
    signOut() {
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    isAdmin(){
      return this.currentUser.role === 'admin'
    }
  },
})
