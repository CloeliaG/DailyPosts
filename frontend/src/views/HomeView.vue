<template>
    <div class="d-flex flex-column flex-md-row align-items-center">
        <img src="../assets/homepage-image.jpg" class="accueil-image me-md-5" alt="image petit-dejeuner sain">

        <div class="container accueil-text p-0 pt-5 m-0">
            <h1><span class="app-name-first">Daily</span><span class="app-name-second">Posts</span> :</h1>
            <h2 class="mb-4 text-muted">Exprimez-vous, inspirez les autres.</h2>

            <div class="text-muted w-100">
            <p>Bienvenue sur DailyPosts, l'application ultime pour exprimer votre créativité et partager vos pensées avec le monde. Que vous ayez une idée brillante à partager, un moment de réflexion à capturer ou simplement envie de communiquer avec les autres, DailyPosts est votre plateforme incontournable. Avec une interface conviviale et des fonctionnalités intuitives, il n'a jamais été aussi facile de poster des messages percutants et d'établir des connexions significatives.</p>

            <p>Partagez votre quotidien, vos réalisations, vos opinions et bien plus encore grâce à DailyPosts. Explorez les différents sujets et découvrez des communautés passionnantes où vous pourrez vous engager dans des conversations animées. Recevez des commentaires constructifs, trouvez l'inspiration auprès d'autres utilisateurs et développez votre réseau d'amis et d'influenceurs. Que ce soit pour rester connecté avec vos proches, pour rejoindre des groupes de passionnés ou simplement pour stimuler votre créativité, DailyPost est l'application qui vous permettra de donner vie à vos idées et de faire entendre votre voix dans un environnement accueillant et positif.</p>
            </div>

            <footer class="text-muted text-center mt-4 mx-auto">© Cloélia Guiraud ©</footer>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useAuthStore} from '@/stores/authStore';

export default {
    computed: {
        ...mapState(useAuthStore, ['isAuthenticated', 'currentUser']),
    },
    methods: {
        ...mapActions(useAuthStore, ['checkAuthenticated'])
    },
    async mounted() {
        await this.checkAuthenticated();
    }
}

</script>

<style scoped>
.container {
  height: 90vh;
}

.main-router-container{
    padding: 0 !important;
}

.accueil-image {
  width: 30vw;
  object-fit: cover;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 90vh;
}

@media (max-width: 767px) {
  .accueil-image {
    width: 100vw;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    height: 100vh;
  }
}

.app-name-first {
    color : #3cb48c
}
.app-name-second {
    color : #f98b9b
}
.accueil-text {
  width: 60vw;
}
footer {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
}
@media (max-width: 767px) {
.accueil-text{
    width: 100%;
}

footer {
    position: relative;
}
}
</style>