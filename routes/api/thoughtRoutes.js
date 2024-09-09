const router = require('express').Router();
const {
    getSingleThought,
    getThoughts,
    createThought,
} = require (//controller);

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;