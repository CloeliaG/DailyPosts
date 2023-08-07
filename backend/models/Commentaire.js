const mongoose = require ("mongoose");

const commentaireSchema = mongoose.Schema({
    content : {type: String, required : true},
    creator : {type: String, required: false}
});

module.exports = mongoose.model("Commentaire", commentaireSchema);