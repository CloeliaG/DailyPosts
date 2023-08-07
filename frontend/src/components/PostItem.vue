<template>
    <div class="col-4 mt-2">
        <div class="card mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-10">
                <h5 class="card-title">{{ post.title }}</h5>
              </div>
              <div class="col-2 d-flex gap-2 justify-content-end">
                <button v-if="true"  @click="$emit('update', post._id)" class="btn btn-outline-secondary">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="btn btn-outline-secondary">
                  <i class="fa-regular fa-eye"></i>
                </button>
                <button v-if="true" class="btn btn-outline-danger">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>

            <p class="card-text">{{ post.content }}</p>
            <div class="row ">
              <div class="col-10">
                <p class="card-text"><small>Créé par : {{ post.creator }}</small></p>
              </div>
              <div class="col-2 d-flex align-items-center justify-content-center">
                <i v-if="true" class="fa-regular fa-heart btn-heart" @click="liked(post)"></i>
                <i v-else class="fa-solid fa-heart btn-heart" @click="liked(post)"></i>
                <small class="ms-1 like">{{ post.likes}}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    message: {
      type: String,
      default: '-'
    }
  }
}
</script>


<style scoped>
.btn-heart {
  cursor: pointer;
  font-size: 1.5rem;
}
.like {
  font-size: 1.1rem;
}
</style>
