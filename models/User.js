const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true, 
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: () => Promise.resolve(false),
                message: 'Email validation failed',
            },
        },
        thoughtId: {
            type: Schema.Types.ObjectId, ref: 'Thought',            
        },
        friends: {
            type: Schema.Types.ObjectId, ref: 'User',
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
// TODO: create virtual called 'friendCount' that retrieves the length of the user's 'friends' array field on query

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;


