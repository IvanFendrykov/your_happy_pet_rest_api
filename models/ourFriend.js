const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const ourFriendSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
});

ourFriendSchema.post('save', handleMongooseError);

const ourFriend = model('contact', ourFriendSchema);

module.exports = ourFriend;