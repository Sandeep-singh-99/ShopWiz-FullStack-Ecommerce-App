const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true, 
    },

    password: {
        type: String,
        required: true,
    }
});

const Admin = model('Admin', adminSchema);  

module.exports = Admin;
