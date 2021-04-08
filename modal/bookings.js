const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = Schema({
   event : {
     type : Schema.Types.ObjectId,
     ref : 'event'
   },
   user : {
     type : Schema.Types.ObjectId,
     ref :'user'
   }
},{timestamps : true});


const bookingModal = mongoose.model('booking' , bookingSchema);

module.exports = bookingModal;