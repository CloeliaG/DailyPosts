<template>
  <div class="container p-4">
    <div class="row d-flex">
      <div class="col-8">
        <h1>Liste des posts</h1>
      </div>

      <div class="col-4 d-flex justify-content-end align-items-center">
        <a href="/newPost" class="btn btn-primary text-white">
          <i class="fa-solid fa-circle-plus me-2"></i>Créer un Post
        </a>
      </div>
    </div>

    <p v-if="!posts || !posts.length" class="text-primary my-5">Aucun posts pour l'instant.</p>

    <div v-else class="row">
      <PostItem 
        v-for="post in posts" 
        :key="post._id" 
        :post="post"
        @delete="deletePost($event)"
        @update="onUpdatePost($event)"
        />
    </div>
  </div>

</template>



<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/authStore.js'
import { useUserStore } from '../stores/userStore.js'
import { usePostStore } from "../stores/postStore.js";

import PostItem from "@/components/PostItem.vue";

export default {
  components: {
    PostItem
  },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated', 'currentUser']),
    ...mapState(usePostStore,['posts', 'totalPosts'])
  },
  mounted() {
    this.getAllPosts();
    this.checkAuthenticated();
    if (this.isAuthenticated) {
      this.getUserById(this.currentUser._id);
      this.isAdmin();
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['logout', 'checkAuthenticated', 'isAdmin']),
    ...mapActions(useUserStore, ['getUserById']),
    ...mapActions(usePostStore, ['getAllPosts','deletePost']),

    onUpdatePost(id) {
        this.$router.push({
          name: 'newPost',
          params: { id }
        })
    }
  }
}
</script>

<style scoped>
.btn-heart {
  cursor: pointer;
  font-size: 1.5rem;
}
.btn {
  margin-right: 0.5rem;
}
.like {
  font-size: 1.1rem;
}
</style>
