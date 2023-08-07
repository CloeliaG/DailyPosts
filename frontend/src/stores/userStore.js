import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: [],
  }),
  getters: {
    getUsers() {
      return this.users;
    },
    getCurrentUser() {
      return this.currentUser;
    },
  },
  actions: {
    async getAllUsers() {
      const { data } = await axios.get('/users');
      this.users = data;
    },
    async getUserById(id) {
      const { data } = await axios.get(`/user/${id}`);
      this.currentUser = data;
    },
    async getUserByName(username) {
      const { data } = await axios.get(`/user/${username}`);
      this.currentUser = data;
    },
    async deleteUser(id) {
      const { data } = await axios.delete(`/users/${id}`);
      this.users = this.users.filter(user => user._id !== id);
      return data;
    },
    async updateUser(id, updatedUser) {
      const { data } = await axios.put(`/users/${id}`, updatedUser);
      if (this.currentUser && this.currentUser._id === id) {
        this.currentUser = data.user;
      }
      this.users = this.users.map(user => (user._id === id ? data.user : user));
      return data;
    },
  },
});
