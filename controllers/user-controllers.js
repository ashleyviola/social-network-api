const { User, Thought} = require ('../models');
const { db } = require('../models/User');

const userController = {
    // get all users 
    getAllUser(req,res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
        });
    },
    // get user by id with thought and friend data 
    getUserById({params},res) {
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // if no user is found, send 404
                if(!dbUserData){
                    res.status(404).json({message: 'No user found with that id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });
    },
    // create new user 
    createUser({body},res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    // udpate user by id 
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(404).json(err));
    },
    // remove user 
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                // remove associated thoughts 
                Thought.deleteMany({username: dbUserData.username})
                .then(() => {
                    res.json(dbUserData);
                })
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },
    // add new friend 
    addFriend({params},res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendsId}},
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user found with that id!'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    },
    // remove friend 
    removeFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendsId}},
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user found with that id!'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    }
};

module.exports = userController;

