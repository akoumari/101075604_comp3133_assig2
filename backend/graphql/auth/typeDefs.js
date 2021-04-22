import { gql } from "apollo-server-express";

const typeDefs = gql`
  type LoginResponse {
    token: String!
  }
  type ResetResponse {
    token: String!
  }


  extend type Query {
    me: User
    checkPasswordExist(id: ID!): Boolean
  }

  extend type Mutation {
    login(email: String!, password: String!): LoginResponse
    resetPassword(passReset: String!): ResetResponse
    sendResetEmail(email: String!): Boolean
    revokeRefreshTokenForUser(id: ID!): Boolean
    switchUser(user: ID!): LoginResponse
    logout: Boolean
    changePassword(currentPassword: String!, newPassword: String!): Boolean
    changePasswordByReset(newPassword: String!, token: String!): Boolean
  }
`;

module.exports = {
  typeDefs,
};
