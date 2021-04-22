import { User, Group } from "../../model";
import { userValidation } from "./validation";
import {
  getFieldsForUpdate,
  validateFields,
  validateEntireSchema,
} from "../../utils";
import { hash } from "bcryptjs";
import { UserInvalidInputError } from "../errors/UserInvalidInputError";
import { EmailInUseError } from "../errors/EmailInUseError";
import { NoArgumentsProvidedError } from "../errors/NoArgumentsProvidedError";
import { NonExistentObjectUpdateError } from "../errors/NonExistentObjectUpdateError";

const UserService = {
  getAllUsers: () => {
    return User.find({});
  },

  getUserById: (id) => {
    return User.findById(id);
  },

  addUser: async (
    {
      username,
      firstname,
      lastname,
      password,
      email,
      
    }
  ) => {
    let user;

  
      user = new User({
        username,
        firstname,
      lastname,
      password,
      email,
      });
   

    if (await User.findOne({ email: email }))
      throw new EmailInUseError();
    if (await User.findOne({ username: username }))
      throw new EmailInUseError();

    const errors = await validateEntireSchema(userValidation, user);
    console.log(errors);
    if (Object.keys(errors).length > 0) throw new UserInvalidInputError(errors);

 
    const hashedPassword = await hash(user.password, 12);
    user.password = hashedPassword;

    return user.save();
  },

  editUser: async ({
    id,
    username,
      password,
      email,
  }) => {
    const updates = getFieldsForUpdate({
      id,
      username,
      password,
      email,
    });

  
    if (!(await User.findById(id).select("_id").lean()))
      throw new NonExistentObjectUpdateError();

    if (Object.keys(updates).length === 0) throw new NoArgumentsProvidedError();

    const errors = await validateFields(userValidation, updates);
    if (Object.keys(errors).length > 0) throw new UserInvalidInputError(errors);

    if (updates.password) {
      const hashedPassword = await hash(updates.password, 12);
      updates.password = hashedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, useFindAndModify: false }
    );

    return updatedUser;
  },
 

};

module.exports = UserService;
