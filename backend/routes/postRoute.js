const express = require('express');
const bodyParser = require('body-parser');
const postController = require('../controllers/postController');
const middleware = require('../middlewares/middlewares');

const router = express.Router();

// Parse les requêtes avec un contenu de type JSON
router.use(bodyParser.json());

// Parse les requêtes avec un contenu de type formulaire URL-encodé
router.use(bodyParser.urlencoded({ extended: true }));

// Créer une publication
router.post('/posts', middleware.isUserLogged, postController.createPost);

// Récupérer toutes les publications
router.get('/posts', middleware.isUserLogged, postController.getAllPosts);

// Récupérer une publication
router.get('/post/:id', middleware.isUserLogged, postController.getOnePost);

// Modifier une publication
router.put('/posts/:id', middleware.isUserLogged, postController.updatePost);

// Supprimer une publication
router.delete('/posts/:id', middleware.isUserLogged, postController.deletePost);

module.exports = router;