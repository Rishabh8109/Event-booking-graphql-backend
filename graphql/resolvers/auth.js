const User = require("../../modal/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (args) => {
    try {
      const user = await User.findOne({ email: args.userInput.email });
      if (user) {
        throw new Error("Email address already exist!");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user_1 = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user_1.save();
      return {
        ...result._doc,
      };
    } catch (err) {
      throw err;
    }
  },
  Login: async (args , req) => {
    const user = await User.findOne({ email: args.email });

    // checking user exists or not
    if (!user) {
      throw new Error("Email address not exist!");
    }

    // checking entered password with existing user password
    const isEqual = await bcrypt.compare(args.password, user.password);

    if (!isEqual) {
      throw new Error('Password incorrect!');
    }

    // getting token from jwt token
    const Accesstoken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "1hr",
      }
    );

    // gettin refresh token form jwt
    const refreshToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: "1y",
      }
    );
    return {
      userId: user.id,
      token: Accesstoken,
      refreshToken : refreshToken,
      tokenExpiration: 1,
    };
  },
};
