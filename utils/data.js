const { Types } = require('mongoose');

const usernames = [
      'AaranZee', 'AaronPo', 'AmandaLi', 'AzaeliaFlo', 'JeffnStacy', 'MatthewKit',
      'NicholasMc', 'StacynJeff', 'ZechariahBol', 'ZeekYer' 
];

const emails = [
    'email@me.com', 'myemail@email.com', 'itsanemail@mail.com', 'youremail@here.com',
    'thismail@aol.com', 'emailme@gmail.com', 'whyisthishere@yahoo.com', 'yoshi@yahoo.com',
    'yesplease@gmail.com', 'lastone@aol.com'
]

const descriptionsBodies = [
    'I disagree with the Javascript approach on set values',
    'I downloaded the new Music Trivia App!',
    'Did you check out this website?',
    'Learning to Code...',
    'I learned to create an App',
    'Where is everyone?',
    'Check out MDN documentation on MongoDB',
    'Hello world',
    'The word for today is MongoDB',
    'Check my code?',
];

const possibleReactions = [
    'I also disagree',
    'What a great game. So much fun!',
    'Awesome, looks so good!',
    'Keep plugging along. You will do just fine!',
    'I tried your App, here were the results',
    'We are all coding...',
    'Great reference. Thank you for this!',
    'Hello, how are you?',
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