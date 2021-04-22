import { ApolloError } from "apollo-server-express";

export class ResetExpiredError extends ApolloError {
  constructor() {
    super("That password reset link has expired. Please request a new one.", "RESET_EXPIRED");
  }
}