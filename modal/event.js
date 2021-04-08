const mongoose = require('mongoose');

const schema = mongoose.Schema;

const eventSchema = schema({
     title : {
       type : String,
       required : true
     },

     description : {
      type : String,
      required : true
    },
    price : {
      type : String,
      required : true
    },
    date : {
      type : Date,
      required : true
    },
    creator : {
      type : schema.Types.ObjectId,
      ref :'user'
    }
});

const eventModal =  mongoose.model('event' , eventSchema);

module.exports = eventModal;