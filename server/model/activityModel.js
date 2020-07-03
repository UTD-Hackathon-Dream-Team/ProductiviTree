const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    activity: {
        type: String,
        required: [true, 'Add an activity']
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

module.exports = mongoose.model('Activity', ActivitySchema);