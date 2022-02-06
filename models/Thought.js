const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: [280, 'You have used too many characters.']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: [1, 'Please enter text to submit.'],
            maxlength: [280, 'You have used too many charcters.']
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String, 
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;