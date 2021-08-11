const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../auth-util/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/user");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}
const userLogin = async ({ name, password }) => {
  const { errors, valid } = validateLoginInput(username, password);

  if (!valid) {
    throw new Error("Errors", { errors });
  }

  const user = await User.findOne({ name });

  if (!user) {
    errors.general = "User not found";
    throw new Error("User not found", { errors });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    errors.general = "Wrong crendetials";
    throw new UserInputError("Wrong crendetials", { errors });
  }

  const token = generateToken(user);

  return {
    ...user._doc,
    id: user._id,
    token,
  };
};
const userRegister = ({
  registerInput: { name, image, email, password, confirmPassword },
}) => {
  // Validate user data
  const { valid, errors } = validateRegisterInput(
    name,
    email,
    password,
    confirmPassword
  );
  if (!valid) {
    throw new Error("Errors", { errors });
  }
  // TODO: Make sure user doesnt already exist
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("Username is taken", {
      errors: {
        name: "This username is taken",
      },
    });
  }
  // hash password and create an auth token
  password = await bcrypt.hash(password, 12);

  const newUser = new User({
    email,
    image,
    name,
    password,
  });

  const res = await newUser.save();

  const token = generateToken(res);

  return {
    ...res._doc,
    id: res._id,
    token,
  };
};
module.exports = {
  userLogin,
  userRegister,
};
