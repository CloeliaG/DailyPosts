import { defineStore } from 'pinia';
import axios from 'axios';
import cloneDeep from 'lodash.clonedeep'
import postInterface from '../interfaces/postInterface.js'

export const usePostStore = defineStore('post', {
  state: () => ({
    message: null,
    user: null,
    token: localStorage.getItem('token') || null,
    posts: [],
    currentPost: null,
    post: null
  }),
  getters: {
    totalPosts : (state) => state.posts.length
  },
  actions: {
    async getAllPosts() {
      try {
        const response = await axios.get('/posts')
        this.$patch({ posts: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    async getPost(id) {
      try {
        const response = await axios.get(`/post/${id}`)
        this.$patch({ currentPost: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    async createPost() {
      this.$patch({ post: cloneDeep(postInterface) })
    },

    async updatePost(id, updatedPost) {
      const { data } = await axios.put(`/posts/${id}`, updatedPost);
      this.posts = this.posts.map((post) => (post._id === data._id ? data : post));
    },

    async savePost(post) {
      post.creator = this.user
      if (post._id) {
        try {
          const response = await axios.patch(`/post/${post._id}`, post)
          console.log('patch response ', response.data)
          this.$reset()
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log("création d'une nouvelle facture")
        try {
          const response = await axios.post(`/posts`, post)
          console.log('post response ', response.data)
          this.$reset()
        } catch (error) {
          console.log(error)
        }
      }
    },

    async deletePost(id) {
      try {
        await axios.delete(`/post/${id}`)
        this.getAllPosts()
      } catch (error) {
        console.log(error)
      }
    },

    isMyPost(post) {
      return post.author === this.user;
    },

    async liked(id) {
        const { data } = await axios.patch(`/posts/${id}`);
        this.posts = this.posts.map((post) => (post._id === data._id ? data : post));
    },

    hasLiked(user,id){
      this.getPost(id);
      console.log(user)
      console.log(this.currentPost.author)
    }
  },
});
