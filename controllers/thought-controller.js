const { Thought, User } = require('../models');

const thoughtController = {
    addThought({ params, body }, res) {
        Thought.create(body).then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
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
    deleteThought({ params }, res) {
        Comment.findOneAndUpdate({_id: params.thoughtId})
        .then(deleteThought => {
            if(!deleteThought) {
                return res.status(404).json({ message: 'No thought found with this id!'});
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {throughts: params.thoughtId}},
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
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            {_id: params.commentId},
            {$pull: { reactions: {reactionId: params.reactinoId}}},
            {new: true}
        ).then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;