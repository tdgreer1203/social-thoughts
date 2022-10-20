const router = require('express').Router();

const { addThought, deleteThought } = require('../../controllers/thought-controller');

router.route('/:userId').post(addThought);

router.route('/:userId/:thoughtId').delete(deleteThought);

module.exports = router;