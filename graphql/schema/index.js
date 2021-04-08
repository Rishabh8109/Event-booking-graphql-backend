  const { buildSchema } = require("graphql");

  module.exports = buildSchema(`
      type Event {
        _id : ID!
        title : String!
        description : String!
        price : Float!
        date : String!
        creator : User!
      }

      type User {
        _id : ID!
        email : String!
        password : String!
        createdEvent : [Event!]
      }

      type Booking {
        event : Event!
        user : User!
        createdAt : String!
        updatedAt : String!
      }

      type Login {
        email : String!
        password : String!
      }

      type AuthData {
        userId : String!
        token : String!
        refreshToken : String!
        tokenExpiration : Int!
      }

      input UserInput {
        email : String!
        password : String!
      }

      input EventInput {
        title : String!
        description : String!
        price : Float!
        date : String!
      }

      type RootQuery  {
        events : [Event!]!
        bookings : [Booking!]!
        Login(email : String! , password : String!) : AuthData
      }

      type RootMutation  {
        createEvents(eventInput : EventInput) : Event
        createUser(userInput : UserInput) : User
        bookEvent(eventId : ID!):Booking
        cancelBooking(bookingId : ID!) : Event
      }

      schema {
        query : RootQuery,
        mutation : RootMutation
      }
`);
