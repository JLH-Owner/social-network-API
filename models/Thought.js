const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: Schema.Types.ObjectId, 
            ref: 'user',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dayjs(timestamp).format('YYYY-MM-DD', 'HH:mm:ss'),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dayjs(timestamp).format('YYYY-MM-DD', 'HH:mm:ss'),
        },
        username: {
            type: Schema.Types.ObjectId, 
            ref: 'user',
            required: true
        },
        reactions: [reactionSchema], 
    },            
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }

);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;