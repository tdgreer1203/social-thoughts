const router = require('express').Router();

const { addThought, addReaction, deleteThought } = require('../../controllers/thought-controller');

router.route('/:userId').post(addThought);

router.route('/:userId/:thoughtId').delete(deleteThought);

router.route('/:thoughtId').post(addReaction);

module.exports = router;