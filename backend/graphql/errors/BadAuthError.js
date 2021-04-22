import { ApolloError } from "apollo-server-express";

export class BadAuthError extends ApolloError {
  constructor() {
    super(
      "You are not authorized",
      "BAD_AUTH"
    );
  }
}
