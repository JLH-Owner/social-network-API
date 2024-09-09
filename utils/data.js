const usernames = [
    'Aaran_1',
    'Aaren_2',
    'Aarez_3',
    'Aarman_4',
    'Aaron_5',
    'Aaron-James_5',
    'Aarron_7',
    'Aaryan_8',
    'Aaryn_9',
    'Aayan_01',
    'Aazaan_02',
    'Abaan_03',
    'Abbas_04',
    'Abdallah_05',
    'Abdalroof_06',
    'Abdihakim_07',
    'Abdirahman_08',
    'Abdisalam_09',
    'Abdul_010',
    'Abdul-Aziz_011',
    'Abdulbasir_012',
    'Abdulkadir_013',
    'Abdulkarem_014',
    'Ze_015',
    'Zechariah_016',
    'Zeek_017',
    'Zeeshan_018',
    'Zeid_019',
    'Zein_11',
    'Zen_12',
    'Zendel_13',
    'Zenith_14',
    'Zennon_15',
    'Zeph_16',
    'Zerah_17',
    'Zhen_18',
    'Zhi_19',
    'Zhong_20',
    'Zhuo_21',
    'Zi_22',
    'Zidane_23',
    'Zijie_24',
    'Zinedine_25',
    'Zion_26',
    'Zishan_27',
    'Ziya_28',
    'Ziyaan_29',
    'Zohaib_020',
    'Zohair_021',
    'Zoubaeir_022',
    'Zubair_023',
    'Zubayr_024',
    'Zuriel_025',
    ``,
];

const descriptionsBodies = [
    'I disagree with the Javascript approach on set values',
    'I downloaded the new Music Trivia App!',
    'Did you check out this website?',
    'Learning to Code...',
    'I learned to create an App',
    'Where is everyone?',
    'Check out MDN documentation on MongoDB',
    'Hello world',
    'Another possible solution to the algorithm',
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

const getRandomUsername = () =>
    `${getRandomeArrItem(usernames)}`;

const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            published: Math.random() < 0.5,
            description: getRandomArrItem(descriptionsBodies),
            advertiserFriendly: Math.random() < 0.5,
            reactions: [...getThoughtReactions(3)],
        });
    }
    return results;
};

const getThoughtReactions = (int) => {
    if (int === 1) {
        return getRandomArrItem(possibleReactions);
    }
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            reactionbody: getRandomArrItem(possibleReactions),
            username: getRandomUsername(),
        });
    }
    return results;
};

module.exports = { getRandomUsername, getRandomThoughts, getThoughtReactions };