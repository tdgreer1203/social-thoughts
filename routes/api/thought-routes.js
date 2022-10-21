const router = require('express').Router();

const { addThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thought-controller');

router.route('/:userId').post(addThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:userId/:thoughtId').delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;