const DataLoader = require('dataloader');
const User = require('../../modal/user');
const Event = require('../../modal/event.js');


const eventLoader = new DataLoader(eventId => {
  return events(eventId);
});


const userLoader = new DataLoader(userId => {
  return User.find({_id : {$in : userId}});
});



const events = async (eventId) => {
  try {
    const events = await Event.find({ _id: { $in: eventId } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {

  try {
    const result = await eventLoader.load(eventId.toString());
    return result;
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());

    return {
      ...user._doc,
      _id: user.id,
      date: new Date().toISOString(),
      createdEvent:() => eventLoader.loadMany(user._doc.createdEvent)
    };
  } catch (err) {
    throw err;
  }
};

const transformBooking = result => {
  return {
    ...result._doc,
    _id : result.id,
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
   creator: user.bind(this, event.creator),
 }
}

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;