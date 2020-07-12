const mongoose = require("mongoose");
const Challenge = require('./model/challengeModel');
const User = require('./model/userModel');

const randomChallenge = async (type) => {
    if(type == 'daily'){
        const challenge = await Challenge.find({}).where({ "type": type});
        const daily = new Array(3);
        for(var i = 0; i < daily.length; i++){
            do{
                var data = challenge[Math.floor((Math.random() * challenge.length))]._id;
            }while(daily.indexOf(data) != -1);
            daily[i] = data;
        }
        return daily;
    }
    if(type == 'weekly'){
        const challenge = await Challenge.find({}).where({ "type": type});
        const weekly = new Array(2);
        for(var i = 0; i < weekly.length; i++){
            do{
                var data = challenge[Math.floor((Math.random() * challenge.length))]._id;
            }while(weekly.indexOf(data) != -1);
            weekly[i] = data;
        }
        return weekly;
    }
};

exports.updateChallenge = async (type) => {
    const users = await User.find();
    if(type == 'daily'){
        for(var i = 0; i < users.length; i++){
            const challenges = await randomChallenge(type);
            await User.find({}).where({ "googleID": users[i].googleID}).replaceOne({}, { 
                $set: { 
                    dailyChallenges: challenges
                } 
            });
        }
    }
    if(type == 'weekly'){
        for(var i = 0; i < users.length; i++){
            const challenges = await randomChallenge(type);
            await User.find({}).where({ "googleID": users[i].googleID}).replaceOne({}, { 
                $set: { 
                    weeklyChallenges: challenges
                } 
            });
        }
    }
};