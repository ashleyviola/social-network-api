const router = require('express').Router();
const {getAllThoughts, getThoughtById, addThought, updateThought, removeThought, addReaction, deleteReaction} = require('../../controllers/thought-controllers');

// /api/thoughts 
router 
    .route('/')
    .get(getAllThoughts);

// /api/thoughts/:userid
router 
    .route('/:userId')
    .post(addThought);

// /api/thoughts/:thoughtId
router 
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);

// /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .delete(removeThought);

// /api/users/:userId/friends/:friendId
router 
    .route('/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;