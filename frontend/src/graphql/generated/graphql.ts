import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type using Date ISO String format */
  DateISO: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};




export type Booking = {
  __typename?: 'Booking';
  id?: Maybe<Scalars['ID']>;
  hotel?: Maybe<Hotel>;
  booking_date?: Maybe<Scalars['DateISO']>;
  booking_start?: Maybe<Scalars['DateISO']>;
  booking_end?: Maybe<Scalars['DateISO']>;
  user?: Maybe<User>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type Error = {
  __typename?: 'Error';
  path?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Hotel = {
  __typename?: 'Hotel';
  id?: Maybe<Scalars['ID']>;
  hotel_name?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addUser?: Maybe<User>;
  editUser?: Maybe<User>;
  login?: Maybe<LoginResponse>;
  resetPassword?: Maybe<ResetResponse>;
  sendResetEmail?: Maybe<Scalars['Boolean']>;
  revokeRefreshTokenForUser?: Maybe<Scalars['Boolean']>;
  switchUser?: Maybe<LoginResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  changePassword?: Maybe<Scalars['Boolean']>;
  changePasswordByReset?: Maybe<Scalars['Boolean']>;
  addHotel?: Maybe<Hotel>;
  editHotel?: Maybe<Hotel>;
  addBooking?: Maybe<Booking>;
  editBooking?: Maybe<Booking>;
};


export type MutationAddUserArgs = {
  username: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationEditUserArgs = {
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  passReset: Scalars['String'];
};


export type MutationSendResetEmailArgs = {
  email: Scalars['String'];
};


export type MutationRevokeRefreshTokenForUserArgs = {
  id: Scalars['ID'];
};


export type MutationSwitchUserArgs = {
  user: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationChangePasswordByResetArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationAddHotelArgs = {
  hotel_name: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  postal_code: Scalars['String'];
  price: Scalars['Int'];
  email: Scalars['String'];
  user: Scalars['ID'];
};


export type MutationEditHotelArgs = {
  id: Scalars['ID'];
  hotel_name?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
};


export type MutationAddBookingArgs = {
  hotel: Scalars['ID'];
  booking_start: Scalars['DateISO'];
  booking_end: Scalars['DateISO'];
  user: Scalars['ID'];
};


export type MutationEditBookingArgs = {
  hotel: Scalars['ID'];
  booking_date: Scalars['DateISO'];
  booking_start: Scalars['DateISO'];
  booking_end: Scalars['DateISO'];
  user: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
  checkPasswordExist?: Maybe<Scalars['Boolean']>;
  hotel?: Maybe<Hotel>;
  hotels?: Maybe<Array<Maybe<Hotel>>>;
  hotelByName?: Maybe<Array<Maybe<Hotel>>>;
  hotelByCity?: Maybe<Array<Maybe<Hotel>>>;
  booking?: Maybe<Booking>;
  bookingsByUser?: Maybe<Array<Maybe<Booking>>>;
  bookings?: Maybe<Array<Maybe<Booking>>>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryCheckPasswordExistArgs = {
  id: Scalars['ID'];
};


export type QueryHotelArgs = {
  id: Scalars['ID'];
};


export type QueryHotelByNameArgs = {
  hotel_name?: Maybe<Scalars['String']>;
};


export type QueryHotelByCityArgs = {
  city?: Maybe<Scalars['String']>;
};


export type QueryBookingArgs = {
  id: Scalars['ID'];
};


export type QueryBookingsByUserArgs = {
  user: Scalars['ID'];
};

export type ResetResponse = {
  __typename?: 'ResetResponse';
  token: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type AddBookingMutationVariables = Exact<{
  hotel: Scalars['ID'];
  booking_start: Scalars['DateISO'];
  booking_end: Scalars['DateISO'];
  user: Scalars['ID'];
}>;


export type AddBookingMutation = (
  { __typename?: 'Mutation' }
  & { addBooking?: Maybe<(
    { __typename?: 'Booking' }
    & Pick<Booking, 'id'>
  )> }
);

export type AddUserMutationVariables = Exact<{
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & { addUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type BookingsByUserQueryVariables = Exact<{
  user: Scalars['ID'];
}>;


export type BookingsByUserQuery = (
  { __typename?: 'Query' }
  & { bookingsByUser?: Maybe<Array<Maybe<(
    { __typename?: 'Booking' }
    & Pick<Booking, 'id' | 'booking_date' | 'booking_start' | 'booking_end'>
    & { hotel?: Maybe<(
      { __typename?: 'Hotel' }
      & Pick<Hotel, 'id' | 'hotel_name' | 'city'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )>>> }
);

export type EditUserMutationVariables = Exact<{
  id: Scalars['ID'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
}>;


export type EditUserMutation = (
  { __typename?: 'Mutation' }
  & { editUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type HotelsQueryVariables = Exact<{ [key: string]: never; }>;


export type HotelsQuery = (
  { __typename?: 'Query' }
  & { hotels?: Maybe<Array<Maybe<(
    { __typename?: 'Hotel' }
    & Pick<Hotel, 'id' | 'hotel_name' | 'street' | 'city' | 'postal_code' | 'price'>
  )>>> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export const AddBookingDocument = gql`
    mutation addBooking($hotel: ID!, $booking_start: DateISO!, $booking_end: DateISO!, $user: ID!) {
  addBooking(
    hotel: $hotel
    booking_start: $booking_start
    booking_end: $booking_end
    user: $user
  ) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddBookingGQL extends Apollo.Mutation<AddBookingMutation, AddBookingMutationVariables> {
    document = AddBookingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddUserDocument = gql`
    mutation addUser($firstname: String!, $lastname: String!, $email: String!, $password: String!, $username: String!) {
  addUser(
    firstname: $firstname
    lastname: $lastname
    email: $email
    password: $password
    username: $username
  ) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddUserGQL extends Apollo.Mutation<AddUserMutation, AddUserMutationVariables> {
    document = AddUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const BookingsByUserDocument = gql`
    query bookingsByUser($user: ID!) {
  bookingsByUser(user: $user) {
    id
    hotel {
      id
      hotel_name
      city
    }
    booking_date
    booking_start
    booking_end
    user {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BookingsByUserGQL extends Apollo.Query<BookingsByUserQuery, BookingsByUserQueryVariables> {
    document = BookingsByUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditUserDocument = gql`
    mutation editUser($id: ID!, $firstname: String, $lastname: String, $email: String, $password: String, $username: String) {
  editUser(
    id: $id
    firstname: $firstname
    lastname: $lastname
    email: $email
    password: $password
    username: $username
  ) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditUserGQL extends Apollo.Mutation<EditUserMutation, EditUserMutationVariables> {
    document = EditUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const HotelsDocument = gql`
    query hotels {
  hotels {
    id
    hotel_name
    street
    city
    postal_code
    price
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class HotelsGQL extends Apollo.Query<HotelsQuery, HotelsQueryVariables> {
    document = HotelsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LogoutGQL extends Apollo.Mutation<LogoutMutation, LogoutMutationVariables> {
    document = LogoutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MeDocument = gql`
    query me {
  me {
    id
    username
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
    document = MeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserDocument = gql`
    query user($id: ID!) {
  user(id: $id) {
    id
    username
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
    document = UserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }