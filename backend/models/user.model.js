const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    password: {
        type: String,
        require: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        require: true
    }
})


UserSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,

        },
            process.env.JWT_SECRET_KEY
        )
    } catch (error) {
        console.log("Error in generating webToken", error)
    }
}

const User = new mongoose.model('user', UserSchema)
module.exports = User