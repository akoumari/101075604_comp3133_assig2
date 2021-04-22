import { ApolloError } from "apollo-server-express";

export class BadTokenError extends ApolloError {
  constructor() {
    super("That password reset link was not found. Please request a new one.", "BAD_TOKEN");
  }
}