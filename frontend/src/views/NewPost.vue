<template>
  <div class="container p-4">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-3">
          {{ isNewPost ? 'Créer un ' : 'Modifier le' }} post
        </h1>
      </div>
    </div>

    <div class="row" v-if="post">
      <div class="col-12">
        <form>
          <div class="mb-3">
            <label for="title" class="form-label">Titre</label>
            <input v-model="post.title" type="text" class="form-control" id="title" placeholder="Titre du post">
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">Contenu</label>
            <textarea v-model="post.content" class="form-control" id="content" rows="3" placeholder="Contenu du post"></textarea>
          </div>
          <button @click="onSavePost()" class="btn btn-primary">{{ isNewPost ? 'Enregistrer' : 'Modifier' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '../stores/authStore.js';
import { usePostStore } from '../stores/postStore.js';

export default {
  name: 'NewPost',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated', 'currentUser']),
    ...mapState(usePostStore, ['post']),

    isNewPost() {
      return !this.id || this.id < 0
    }
  },
  async mounted() {     
    await this.checkAuthenticated();
    if (this.isNewPost) {
      await this.createPost()
      this.post.creator = this.currentUser.username;
    } else {
      await this.getPost(this.id)
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['checkAuthenticated']),
    ...mapActions(usePostStore, ['getPost', 'createPost', 'updatePost', 'savePost']),
    async onSavePost() {
      await this.savePost(this.post)
      this.$router.push({
          name: 'posts'
        })
    }
  }
};
</script>
