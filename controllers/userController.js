const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        }   catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occured while retrieving users.' });
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findById({ _id: req.params.userId })
            if(!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(user);
        }   catch (err) {
            res.status(500).json({ message: 'An error occured while retrieving the user.' });
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);

            return(newUser);
            
        }   catch (err) {
            res.status(500).json({ message: 'An error occured while creating the user.' });
        }
    },
    async updateUser(req, res) {
        try {
            const userId = req.params.userId;
            const { username, email } = req.body;
            
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { username, email },
                { new: true, runMatch: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.status(200).json(updatedUser);

            
        }   catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occured while updating the user.' });
        }
    },
    async deleteUser(req, res) {
        try {
            const userId = req.params.userId;
            const { username } = await User.findByIdAndDelete(
                userId, {username});

            if (!userId) {
              return res.status(404).json({ message: 'No user found with that ID' }); 
            }

            await Thought.deleteMany({ _id: { $in: user.thoughtId } });
        res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
          res.status(500).json({ message: 'An error occured while deleting the user.' });
        }
    },
};