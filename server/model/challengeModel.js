const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Add a description']
    },
    activities: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, 'Add a list of activities']
    },
    type: {
        type: String,
        required: [true, 'Add a type']
    },
    points: {
        type: Number,
        required: [true, 'Add the number of points']
    },
    goal: {
        type: Number,
        required: [true, 'Add the goal amount']
    }
});

module.exports = mongoose.model('Challenge', ChallengeSchema);