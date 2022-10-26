const { Thought, User } = require('../models');

const thoughtController = {
    getAllThought({ params }, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id }).populate({
            path: 'reactions',
            select: '-__v'
        }).select('-__v').then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    addThought({ params, body }, res) {
        Thought.create(body).then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.id},
                { $push: {thoughts: _id}},
                {new: true}
            );
        }).then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.json(err));
    },
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: { reactions: body}},
            { new: true, runValidators: true}
        ).then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => res.json(err));
    },
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {
            new: true,
            runValidators: true
        }).then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that ID!'});
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(deleteThought => {
            if(!deleteThought) {
                return res.status(404).json({ message: 'No thought found with this id!'});
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.thoughtId}},
                { new: true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: { reactions: {reactionId: params.reactionId}}},
            {new: true}
        ).then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;