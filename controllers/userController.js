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
            const userId = req.params.userId;
            if(!userId) {
                return res.status(400).json({ message: 'User ID is required.'})
            }

            const user = await User.findOne({ _id: userId })
            if(!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.status(200).json(user);
        }   catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occured while retrieving the user.' });
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            return res.status(200).json(dbUserData);
                    
        }   catch (err) {
            res.status(500).json({ message: 'An error occured while creating the user.' });
        }
    },
    async updateUser(req, res) {
        try {
            const userId = req.params.userId;
            const { username, email, friends } = req.body;
            
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { username, email, friends },
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
            //const { username } = await User.findByIdAndDelete(
              //  userId, {username});

            if (!userId) {
              return res.status(400).json({ message: 'User ID is required.' }); 
            }

            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            
            return res.status(200).json ({ message: 'User deleted successfully.' });        
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occured while deleting the user.' });
        }
    },
    async addFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;

            if (!userId || !friendId) {
                return res.status(404).json({ message: 'User ID and Friend ID is required.' });
            }

            const user = await User.findById(userId);
            const friend = await User.findById(friendId);

            if (!user || !friend) {
                return res.status(404).json({ message: 'User or Friend not found!'});
            }

            if (user.friends.includes(friendId)) {
                return res.status(400).json({ message: 'User is already a friend.'});
            }

            user.friends.push(friendId);
            await user.save();

            res.status(200).json({ message: 'Friend added successfully!', friends: user.friends });

        }  catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred while adding the friend.' });
        }
    },
    async removeFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
            
            if (!userId || !friendId) {
                return res.status(400).json({ message: 'User ID and Friend ID are required.' });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }

            if (!user.friends.includes(friendId)) {
                return res.status(400).json({ message: 'User is not a friend.' });
            }

            user.friends = user.friends.filter(friend => friend.toString() !== friendId);
            await user.save();

            res.status(200).json({ message: 'Friend removed successfully.', friends: user.friends });
        }  catch (err) {
            console.error(err);
            res.status(500).json({ message: 'An error occurred while removing the friend.' });
        }
    },
};