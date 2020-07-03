const Challenge = require('../model/challengeModel');

exports.getChallenges = async (req, res, next) => {
    try {
        const challenges = await Challenge.find();

        return res.status(200).json({
            success: true,
            count: challenges.length,
            payload: challenges
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.getChallenge = async (req, res, next) => {
    try {
        const challenge = await Challenge.find({}).where({ "_id": req.params.id});

        if(challenge.length == 0){
            return res.status(404).json({
                success: false,
                error: 'No challenge found'
            });
        }

        return res.status(200).json({
            success: true,
            payload: challenge[0]
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.addChallenge = async (req, res, next) => {
    try {
        const challenge = await Challenge.create(req.body);

        return res.status(201).json({
            success: true,
            payload: challenge[0]
        });
    } catch (error) {
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
        
            return res.status(400).json({
                success: false,
                error: messages
            });

        } 
        
        else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    } 
}

exports.deleteChallenge = async (req, res, next) => {
    try {
        const challenge = await Challenge.find({}).where({ "_id": req.params.id});
        
        if(challenge.length == 0){
            return res.status(404).json({
                success: false,
                error: 'No challenge found'
            });
        }

        await Challenge.deleteOne({_id : req.params.id});

        return res.status(200).json({
            success: true,
            payload: challenge[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.updateChallenge = async (req, res, next) => {
    try {

        const challenge = await Challenge.find({}).where({ "_id": req.params.id});

        if(challenge.length == 0){
            return res.status(404).json({
                success: false,
                error: 'No challenge found'
            });
        }

        if(req.body.activities != null) {
            await Challenge.find({}).where({ "_id": req.params.id}).replaceOne({}, { 
                $set: { 
                    activities: req.body.activities
                } 
            });
        }

        if(req.body.category != null) {
            await Challenge.find({}).where({ "_id": req.params.id}).replaceOne({}, { 
                $set: { 
                    category: req.body.category
                } 
            });
        }
        
        if(req.body.points != null) {
            await Challenge.find({}).where({ "_id": req.params.id}).replaceOne({}, { 
                $set: { 
                    points: req.body.points
                } 
            });
        }

        
        return res.status(200).json({
            success: true,
            payload: challenge[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.getCategoryChallenge = async (req, res, next) => {
    try {
        const challenge = await Challenge.find({}).where({ "category": req.params.category});

        if(challenge.length == 0){
            return res.status(404).json({
                success: false,
                error: 'No challenge found'
            });
        }

        return res.status(200).json({
            success: true,
            payload: challenge
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.deleteCategoryChallenge = async (req, res, next) => {
    try {
        const challenge = await Challenge.find({}).where({ "category": req.params.category});
        
        if(challenge.length == 0){
            return res.status(404).json({
                success: false,
                error: 'No challenge found'
            });
        }

        await Challenge.deleteMany({category: req.params.category});

        return res.status(200).json({
            success: true,
            payload: challenge
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}