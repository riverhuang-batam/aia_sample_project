const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //_id: mongoose.Types.ObjectId, this cannot be use if the node is old
    email: {type:String, required: true},
    name: {type:String, required:true},
    password: {type: String, required: true},
    phone: {type: String}
    // productImage: {type: String, required:true}
})
module.exports = mongoose.model('User', userSchema)