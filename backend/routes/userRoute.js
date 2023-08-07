const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middlewares');

const router = express.Router();

// Parse les requêtes avec un contenu de type JSON
router.use(bodyParser.json());

// Parse les requêtes avec un contenu de type formulaire URL-encodé
router.use(bodyParser.urlencoded({ extended: true }));

// Récupérer tous les utilisateurs
router.get('/users', middleware.isUserLogged, userController.getAllUsers);

// Récupérer un utilisateur par son username
router.get('/user/:username', userController.getUserByUsername);

// Récupérer un utilisateur
router.get('/user/:id', middleware.isUserLogged, userController.getUserById);


// Supprimer un utilisateur
router.delete('/users/:id', middleware.isUserLogged, userController.deleteUser);

module.exports = router;