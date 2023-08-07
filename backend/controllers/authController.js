const User = require('../models/User.js');
const userService = require('../service/userService')
const authService = require('../service/authService')

exports.signIn = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await userService.getUserByUsername(username);
        if (!user) throw new Error('User not found');
        const match = await authService.comparePasswords(password, user.password);
        if (!match) throw new Error('Wrong password');
        const token = authService.createToken({ id: user._id, username: user.username , role: user.role});
        const userId = user._id
        res.json({ message: 'Connexion réussi !', token, userId});
    }
    catch(error){
        res.status(500).json({ error })
    }
}

exports.signUp = async (req, res) => {
    try{
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error('Missing username or password');
        }
        const user = await userService.getUserByUsername(username);
        if (user) throw new Error('User already exists');
        const hashedPassword = await authService.hashPassword(password);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.json({ message: 'Utilisateur crée avec succès !' });
    }
    catch(error){
        console.log('c\'est ICI ===> ' + error)
        res.status(500).json({error})
    }
}

exports.isAuth = async (req, res) => {
    try{
        const { user } = req;
        res.json({ isAuthenticated: true, user });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}