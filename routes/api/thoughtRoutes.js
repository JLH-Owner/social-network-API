const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    getThoughtReactions,
    addThoughtReaction,
    removeThoughtReaction,
} = require ('../../controllers/thoughtController');

router.route('/')
.get(getThoughts)
.post(createThought);

router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions').get(getThoughtReactions).post(addThoughtReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

module.exports = router;