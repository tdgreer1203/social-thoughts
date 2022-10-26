const router = require('express').Router();

const { getAllThought, addThought, deleteThought, addReaction, deleteReaction, getThoughtById, updateThoughtById } = require('../../controllers/thought-controller');

router.route('/').get(getAllThought);

router.route('/:id').get(getThoughtById).post(addThought).put(updateThoughtById);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:userId/:thoughtId').delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;