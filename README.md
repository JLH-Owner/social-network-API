# Social Network API

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Author](#author)
- [Credits](#credits)
- [Images](#images)
- [LINKS](#links)

## Description
This app is a social network API to demonstrate how to properly manipulate and manage a database using MongoDB for your database, express for routes, and Insomnia for manipulation to successfully feed social networks. We can create/manage users as well as create/manage "Thoughts" or posts. We also have the ability to create/manage "Reactions" to "Thoughts". And lastly, it will also allow us to add/remove friends for our users. 

## Installation
First, in your terminal, execute the command "npm install", then "nodemon" to start the application running on PORT 3001. 

```
  "scripts": {
    "start": "nodemon server.js"
  },
  
  "dependencies": {
    "dayjs": "^1.11.13",
    "express": "^4.21.0",
    "express.js": "^1.0.0",
    "mongoose": "^8.6.1"
  }
  ```


## Usage
Be sure your connection.js file connects to MongoDB like so,

```
const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/thoughtsAndReactions');

module.exports = connection; 
```
This way your data is updated each time you execute an endpoint
<img src="assets\images\mongodb.png"/>

Use Insomnia with the server running on 'localhost' to manipulate the data.
A demonstration video will show you how to complete and execute all endpoints.
Set up your collection folders as follows:

<img src="assets\images\collection-structure-insomnia.png"> 

Once you set up the endpoints. You will see that you can easily...

find all users:
```
const users = await User.find();
```

create a user: 
```
async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            return res.status(200).json(dbUserData);
                    
        }   catch (err) {
            res.status(500).json({ message: 'An error occured while creating the user.' });
        }
    },
```

update and delete thoughts:
```
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
                .json({ message: 'An error occured while deleting the thought.' });
            }

            res.json({ message: 'Thought successfully deleted!' });
        }   catch (err) {
            res.status(500).json(err);
        }
    },
```
You can also add a new reaction by accessing the thoughtId:
```
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
```

And even add or remove friends for a userId:
```
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
```

## Author
Stacy Herbert

## Credits
Collaborator: Anthony Harper

## Images

![Showing the "Find()" function in Insomnia](/assets/images/find-all-users.png)
![Showing the "FindOneAndDelete()" function in Insomnia](/assets/images/deleted-thought.png)
![Showing "addFriend" function in Insomnia](/assets/images/add-friend.png)
![Showing MongoDB User Collection](/assets/images/mongodb-user-collection.png)
![Showing MongoDB Thought Collection](/assets/images/mongodb-thought-collection.png)


## LINKS
GitHub Repository: <a href="https://github.com/JLH-Owner/social-network-API">JLH-Owner/Social Network API</a>

<a href="https://drive.google.com/file/d/1h9tT4pr0xIAcw56JYtzkOtic6iM8n19h/view?usp=sharing">Link to Live Demo</a>