const User = require("../models/User");
const mongoose = require('mongoose');

exports.createUser = (user) => {
    return User.create({ ...user })
}

exports.getUserById = (id) => {
    const objectId = new mongoose.Types.ObjectId(id);
    return User.findById(objectId);
  };

exports.getUserByUsername = (username) => {
    return User.findOne({ username: username });
};

exports.getAllUsers = () => {
    return User.find()
}

exports.deleteUser = (id) => {
    return User.findByIdAndDelete(id)
}

exports.updateUser = (id, user) => {
    return User.findByIdAndUpdate(id, { ...user })
}