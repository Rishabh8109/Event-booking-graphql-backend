
const User = require('../../modal/user');
const Event = require('../../modal/event.js');

const transformBooking = result => {
  return {
    ...result._doc,
    user: user.bind(this, result._doc.user),
    event: singleEvent.bind(this, result._doc.event),
    createdAt: new Date(result._doc.createdAt).toISOString(),
    updatedAt: new Date(result._doc.updatedAt).toISOString(),
  };
 }

 const transformEvent = event => {
  return {
   ...event._doc,
   _id: event.id,
   date: new Date().toISOString(),
   creator: user.bind(this, event._doc.creator),
 }
}

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {
  try {
    const result = await Event.findById(eventId);
    return transformEvent(result);
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      date: new Date().toISOString(),
      createdEvent: events.bind(this, user.createdEvent),
    };
  } catch (err) {
    throw err;
  }
};


exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;