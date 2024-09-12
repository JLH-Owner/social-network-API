const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true, 
            required: true,
            trim: true,
            minLength: 6,
            maxLength: 20
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Must match a valid email address'],
        },
        thoughtId: {
            type: Schema.Types.ObjectId, ref: 'Thought',            
        },
        friends: {
            type: [Schema.Types.ObjectId], 
            ref: 'User',
            default: [],
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;


