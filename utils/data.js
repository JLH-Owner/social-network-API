const { Types } = require('mongoose');

const usernames = [
      'Stacy445', 'Jeff434', 'Holly123', 'Megan987', 'Bob1412'
];

const emails = [
    'stacy445@gmail.com', 'jeff434@gmail.com', 'holly123@gmail.com', 'megan987@gmail.com',
    'bob1412@aol.com'
]

const descriptionsBodies = [
    'I downloaded the new Music Trivia App!',
    'Did you check out this website?',
    'I learned to create an App',    
    'Check out MDN documentation on MongoDB',
    'Hello world',
];

const possibleReactions = [
    'What a great game. So much fun!',
    'Awesome, looks so good!',
    'I tried your App, here were the results',
    'Great reference. Thank you for this!',
    'Hello, how are you?'
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUsers = (int) => {
    let results = [];
    let usedUsernames = new Set(); // To track used usernames
    let usedEmails = new Set(); // To track used emails
    
    while (results.length < int) {
        const username = getRandomArrItem(usernames);
        const email = getRandomArrItem(emails);

        if(!usedUsernames.has(username) && !usedEmails.has(email)) {

            results.push({
                username: username,
                email: email,
            });
            usedUsernames.add(username);
            usedEmails.add(email);
        }
    }
    return results;
};
    
const getRandomThoughts = (int, userIds) => {
    if (!userIds || userIds.length === 0) {
        throw new Error("User Ids are required to genrate thoughts.");
    }
    
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: getRandomArrItem(descriptionsBodies),
            username: userIds[Math.floor(Math.random() * userIds.length)],
            reactions: getThoughtReactions(3, userIds),
        });
    }
    return results;
};

const getThoughtReactions = (int, userIds) => {
    if (!userIds || userIds.length === 0) {
        throw new Error("User IDs are required to generate reactions.");
    }

    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            reactionBody: getRandomArrItem(possibleReactions),
            username: userIds[Math.floor(Math.random() * userIds.length)],
        });
    }
    return results;
};

module.exports = { getRandomUsers, getRandomThoughts, getThoughtReactions };