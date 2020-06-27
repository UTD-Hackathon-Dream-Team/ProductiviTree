const User = require('../model/userModel');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            payload: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.find({}).where({ "googleID": req.params.googleId});

        if(user.length == 0){
            return res.status(404).json({
                success: false,
                error: 'No user found'
            });
        }

        return res.status(200).json({
            success: true,
            payload: user[0]
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        return res.status(201).json({
            success: true,
            payload: user[0]
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

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.find({}).where({ "googleID": req.params.googleId});
        
        if(user.length == 0){
            return res.status(404).json({
                success: false,
                error: 'No user found'
            });
        }

        await User.deleteOne({googleID : req.params.googleId});

        return res.status(200).json({
            success: true,
            payload: user[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.updateUser = async (req, res, next) => {
    try {

        const user = await User.find({}).where({ "googleID": req.params.googleId});

        if(user.length == 0){
            return res.status(404).json({
                success: false,
                error: 'No user found'
            });
        }

        if(req.body.ProfilePic != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    ProfilePic: req.body.ProfilePic
                } 
            });
        }

        if(req.body.Username != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    Username: req.body.Username
                } 
            });
        }
        
        if(req.body.Bio != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    Bio: req.body.Bio
                } 
            });
        }

        if(req.body.Email != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    Email: req.body.Email
                } 
            });
        }

        if(req.body.ReceiveNotifications != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    ReceiveNotifications: req.body.ReceiveNotifications
                } 
            });
        }

        if(req.body.Posts != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    Posts: req.body.Posts
                } 
            });
        }

        if(req.body.Challenges != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    Challenges: req.body.Challenges
                } 
            });
        }

        if(req.body.Trees != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    Trees: req.body.Trees
                } 
            });
        }

        if(req.body.Points != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    Points: req.body.Points
                } 
            });
        }

        if(req.body.DailyGoal != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    DailyGoal: req.body.DailyGoal
                } 
            });
        }

        if(req.body.Followers != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    Followers: req.body.Followers
                } 
            });
        }

        if(req.body.Following != null) {
            await User.find({}).where({ "googleID": req.params.googleId}).replaceOne({}, { 
                $set: { 
                    Following: req.body.Following
                } 
            });
        }

        return res.status(200).json({
            success: true,
            payload: user[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}