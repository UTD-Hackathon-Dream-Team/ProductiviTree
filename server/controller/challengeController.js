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
            payload: challenge
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

        if(req.body.description != null) {
            await Challenge.find({}).where({ "_id": req.params.id}).replaceOne({}, { 
                $set: { 
                    description: req.body.description
                } 
            });
        }

        if(req.body.activities != null) {
            await Challenge.find({}).where({ "_id": req.params.id}).replaceOne({}, { 
                $set: { 
                    activities: req.body.activities
                } 
            });
        }

        if(req.body.type != null) {
            await Challenge.find({}).where({ "_id": req.params.id}).replaceOne({}, { 
                $set: { 
                    type: req.body.type
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
        if(req.body.goal != null) {
            await Challenge.find({}).where({ "_id": req.params.id}).replaceOne({}, { 
                $set: { 
                    goal: req.body.goal
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

exports.getTypeChallenge = async (req, res, next) => {
    try {
        const challenge = await Challenge.find({}).where({ "type": req.params.type});

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

exports.deleteTypeChallenge = async (req, res, next) => {
    try {
        const challenge = await Challenge.find({}).where({ "type": req.params.type});
        
        if(challenge.length == 0){
            return res.status(404).json({
                success: false,
                error: 'No challenge found'
            });
        }

        await Challenge.deleteMany({type: req.params.type});

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