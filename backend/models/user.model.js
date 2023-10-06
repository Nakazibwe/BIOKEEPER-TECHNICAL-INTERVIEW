const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: [true, 'Please enter password'],
        trim: true,
    }
},{timestamps: true,});
module.exports = mongoose.model('User', userSchema);