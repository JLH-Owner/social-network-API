const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getThoughtReactions(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId });
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json(thought.reactions);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            const { thoughtText, username } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'User not found!' });
            }

            const thought = await Thought.create({
                thoughtText,
                username: user._id,
            });

            res.status(201).json(thought, { message: 'Created Thought 🎉' });
        }   catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occured while creating the thought.' });
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: false, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }

            res.json(thought);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
              return res.status(404).json({ message: 'No thought with this ID' }); 
            }

            const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res
                .status(404)
                .json({ message: 'Thought created but no user with this ID!' });
            }

            res.json({ message: 'Thought successfully deleted!' });
        }   catch (err) {
            res.status(500).json(err);
        }
    },
    async addThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }

            res.json(reaction);
        }   catch (err) {
            res.status(500).json(err);
        }
    },
    async removeThoughtReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )

            if (!reaction) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }

            res.json(thought);
        }   catch (err) {
            res.status(500).json(err);
        }
    },
};