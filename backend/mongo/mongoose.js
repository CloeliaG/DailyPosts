require('dotenv').config()
const mongoose = require('mongoose');

const user = process.env.MONGO_USER
const pass = process.env.MONGO_PASS
const cluster = process.env.MONGO_CLUSTER
const db = process.env.MONGO_DB

const connectDB = async () => {
        mongoose.connect(`mongodb+srv://${user}:${pass}@${cluster}/${db}?retryWrites=true&w=majority`,
      { useNewUrlParser: true,
        useUnifiedTopology: true })
      .then(() => console.log('Connexion à MongoDB réussie !'))
      .catch((error) => console.log(`Connexion à MongoDB échouée ! Erreur : ${error}`));
}

module.exports = connectDB;