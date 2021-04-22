import { gql } from "apollo-server-express";
import user from "./user";
import hotel from "./hotel";
import booking from "./booking";
import error from "./error";
import { DateISO } from "./scalars";
import auth from "./auth";

const resolvers = [
  user.resolvers,
  auth.resolvers,
  hotel.resolvers,
  booking.resolvers,  
  DateISO.resolvers,
];

const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  ${error.typeDefs}
  ${user.typeDefs}
  ${auth.typeDefs}
  ${hotel.typeDefs}
  ${booking.typeDefs}  
  ${DateISO.typeDefs}
`;

module.exports = {
  resolvers,
  typeDefs,
};
