const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");

const authSchema = new Schema({
    imageUrl: {
        type: String,
    },

    cloudinaryId: {
        type: String,
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    },
})

authSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

authSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}


const Auth = new model("Auth", authSchema)

module.exports = Auth
