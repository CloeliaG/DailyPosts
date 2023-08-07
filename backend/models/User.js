const mongoose = require ("mongoose");

const userSchema = mongoose.Schema({
    username : {type: String, unique : true, required : true, index : true},
    password : {type: String, required : true, minLength : 6 },
    role : {type: String, required : true, enum : ["user", "admin"], default : "user"}
});

module.exports = mongoose.model("User", userSchema);