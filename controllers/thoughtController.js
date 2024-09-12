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

            return res.status(201).json(thought);
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
            const thoughtId = req.params.thoughtId;

            if (!thoughtId) {
              return res.status(404).json({ message: 'Thought ID is required.' }); 
            }

            const deletedThought = await Thought.findByIdAndDelete(thoughtId);

            if (!deletedThought) {
                return res
                .status(404).json({ message: 'No thought found by that ID!' });
            }

            res.status(200).json({ message: 'Thought successfully deleted!' });
        }   catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred while deleting the thought.' });
        }
    },
    async addReaction(req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const { reactionBody, username } = req.body;
            
            if (!reactionBody || !username) {
                return res.status(404).json({ message: 'Reaction body and username are required.' });
            }

            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $addToSet: { reactions: { reactionBody, username } } },
                { new: true, runValidators: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }

            res.status(200).json(updatedThought);
        }  catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred while adding the reaction.' });
        }
    },
    async removeReaction(req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const reactionId = req.params.reactionId;

            if (!reactionId) {
                return res.status(400).json({ message: 'Reaction ID is required.' });
            }

            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $pull: { reactions: { reactionId } } },
                { new: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found by that ID!' });
            }

            res.status(200).json(updatedThought);
        }  catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred while removing the reaction.' });
        }
    },
};