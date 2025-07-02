const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const labelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mails: [{
        type: Schema.Types.ObjectId,
        ref: 'Mail' 
    }],
    isDefault: {
        type: Boolean,
        default: false
    },
    allowAdd: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Label', labelSchema);