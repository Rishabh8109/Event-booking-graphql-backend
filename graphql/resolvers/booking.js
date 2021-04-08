const Booking = require("../../modal/bookings");
const {transformBooking , transformEvent} = require('./merge');


module.exports = {
  // find booking form document
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((result) => {
        return transformBooking(result);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args , req) => {
    if(!req.isAuth) {
      throw new Error('unauthenticated');
    }
    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const bookedEvent = await new Booking({
        event: fetchedEvent,
        user: req.userData.userId
      });

      const result = await bookedEvent.save();
      return transformBooking(result);
    } catch (err) {
      throw err;
    }
  },
  cancelBooking : async args => {
      try {
      const result = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(result.event);
      await Booking.findOneAndDelete(args.bookingId);
      return event;
    } catch (err) {
      throw err;
    }
  }
};

