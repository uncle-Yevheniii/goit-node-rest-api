import { model, Schema } from "mongoose";
// import bcrypt from "bcrypt";

import { userSubscription } from "../constants/userSubscription.js";

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: Object.values(userSubscription),
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("User", userSchema);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);

//   next();
// });

// userSchema.methods.checkUserPassword = (candidate, passwordHash) =>
//   bcrypt.compare(candidate, passwordHash);
