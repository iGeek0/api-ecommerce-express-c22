const { Schema, model } = require('mongoose');

const UsersSchema = Schema({
    name: {
        type: String
    },
    last_name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    dob: {
        type: Date
    },
    active: {
        type: Boolean
    },
}, { versionKey: false });

module.exports = model('User', UsersSchema);