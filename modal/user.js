const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
   email : {
     type : 'string',
     required : true
   },
   password : {
     type : 'string',
     required : true
   },
   createdEvent : [
     {
        type : Schema.Types.ObjectId,
        ref :'event'
     }
   ]
});

const userModal =  mongoose.model('user' , userSchema);

module.exports = userModal;