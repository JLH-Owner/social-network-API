//const connection = require('../config/connection');
//const { User, Thought } = require('../models');
//const { getRandomUsers, getRandomThoughts } = require('./data');
//
//connection.on('error', (err) => err);
//
//connection.once('open', async () => {
//    console.log('connected');
//
//    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
//    if (thoughtCheck.length) {
//        await connection.dropCollection('thoughts');
//    }
//
//    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
//    if (userCheck.length) {
//        await connection.dropCollection('users');
//    }
//
//    const users = getRandomUsers(10);
//    const insertedUsers = await User.insertMany(users);
//
//    const userIds = insertedUsers.map(user => user._id);
//
//    const thoughts = getRandomThoughts(10, userIds);
//    await Thought.insertMany(thoughts);
//    
//    console.table(insertedUsers);
//    console.table(thoughts);
//    console.info('Seeding complete🌱');
//    process.exit(0);
//});