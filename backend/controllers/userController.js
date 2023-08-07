const User = require('../models/User.js');
const userService = require('../service/userService')
const authService = require('../service/authService')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
}

exports.getUserById = async (req, res) => {
    try {
        console.log(req.params)
        const user = await userService.getUserById(req.params._id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
}

exports.getUserByUsername = async (req, res) => {
    try {
      const user = await userService.getUserByUsername(req.params.username);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({ message: 'Utilisateur modifié avec succès', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la modification de l\'utilisateur' });
    }
}
