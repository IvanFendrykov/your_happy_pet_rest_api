const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const ourFriendSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    addressUrl: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    workDays: {
        type: Array,
        required: true
    },
    address: {
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
    imgUrl: {
        type: String,
        required: true
    },
});

ourFriendSchema.post('save', handleMongooseError);

const ourFriend = model('ourfriend', ourFriendSchema);

module.exports = ourFriend;