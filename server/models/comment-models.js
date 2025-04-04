const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    userId: {
        type: String,
        ref: 'Auth',
    },

    productId: {
        type: String,
        ref: 'Product',
    },

    comment: {
        type: String,
        required: true
    },

    date: {
        type: String,
    },

    day: {
        type: String,
    },

    time: {
        type: String,
    }
}, {
    timestamps: true
})

function getCurrentDateTime() {
    const now = new Date()
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return {
        date: now.toDateString(),
        day: daysOfWeek[now.getDay()],
        time: now.toLocaleTimeString()
    }
}

commentSchema.pre('save', function (next) {
    const { date, day, time } = getCurrentDateTime()
    this.date = date
    this.day = day
    this.time = time
    next()
})

const Comment = new model("Comment", commentSchema)

module.exports = Comment