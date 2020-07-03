const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    activities: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, 'Add a list of activities']
    },
    category: {
        type: String,
        required: [true, 'Add a category']
    },
    points: {
        type: Number,
        required: [true, 'Add the number of points']
    }
});

module.exports = mongoose.model('Challenge', ChallengeSchema);