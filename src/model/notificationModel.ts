

import mongoose, { Schema } from 'mongoose';


const NotificationSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    resource: {
        type: String,
        required: true,
    },
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

export default Notification;