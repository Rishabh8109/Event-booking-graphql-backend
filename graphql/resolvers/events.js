// Database Modals
const Event = require("../../modal/event");
const User = require("../../modal/user");
const {transformEvent} = require('./merge');


module.exports = {
  events: async () => {
    const result = await Event.find();
    return result.map((event) => {
      return transformEvent(event);
    });
  },
  createEvents: async (args , req) => {
    if(!req.isAuth) {
      throw new Error("unauthorized");
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userData.userId
    });

    let createdEvent;
    try {
      const results = await event.save();
      createdEvent = transformEvent(results);
      const user = await User.findById(req.userData.userId);
      if (!user) {
        throw new Error("user not found");
      }
      user.createdEvent.push(event);
      const result_1 = await user.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
};

