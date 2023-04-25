const mongoose = require('mongoose');
const emailSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //_id: mongoose.Types.ObjectId, this cannot be use if the node is old
    body: {type: Object, required: true},
    createByUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    // productImage: {type: String, required:true}
})
module.exports = mongoose.model('email', emailSchema)