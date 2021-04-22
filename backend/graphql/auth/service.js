import { sign, verify } from "jsonwebtoken";
import { User } from "./../../model";

export const createAccessToken = (user) => {
  return sign(
    {
      userId: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_DURATION || "15s" }
  );
};

export const createRefreshToken = (user) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_DURATION || "1d",
    }
    );
  };
  export const createResetToken = (user) => {
    return sign(
      {
        userId: user.id,
        email: user.email,
        passResetExpire: user.passResetExpire,
       //Date.now() + 900000
      },
      process.env.PASS_RESET_TOKEN_SECRET,
      { expiresIn:  "900s" }
    );
  };
export const createResetRefreshToken = (user) => {
  return sign(
    { userId: user.id, passResetVersion: user.passResetVersion },
    process.env.PASS_RESET_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "900s",
    }
  );
};

export const handleRefreshToken = async (req, res) => {
  let token = req.cookies.jgrtk;

  if (!token) return res.send({ ok: false, accessToken: "" });

  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ ok: false, accessToken: "" });
  }

  const user = await User.findById(payload.userId);
  // console.log(payload);

  if (!user) return res.send({ ok: false, accessToken: "" });

  if (user.tokenVersion !== payload.tokenVersion) {
    clearCookie(res);
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));
  // console.log("TOKEN RENEWED");

  return res.send({ ok: true, accessToken: createAccessToken(user) });
};


export const handlePassRefreshToken = async (req, res) => {
  let token = req.cookies.jgprtk;

  if (!token) return res.send({ ok: false, resetToken: "" });

  let payload = null;
  try {
    payload = verify(token, process.env.PASS_RESET_REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ ok: false, resetToken: "" });
  }

  const user = await User.findById(payload.userId);
  // console.log(payload);

  if (!user) return res.send({ ok: false, resetToken: "" });

  if (user.passResetVersion !== payload.passResetVersion) {
    clearCookie(res);
    return res.send({ ok: false, resetToken: "" });
  }

  sendPassRefreshToken(res, createResetRefreshToken(user));
  // console.log("TOKEN RENEWED");

  return res.send({ ok: true, resetToken: createResetToken(user) });
};

export const sendPassRefreshToken = (res, token) => {
  res.cookie("jgprtk", token, {
    httpOnly: true,
    path: "/pass_refresh_token",
  });
};
export const sendRefreshToken = (res, token) => {
  res.cookie("jgrtk", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};

export const clearCookie = (res) => {
  res.cookie("jgrtk", "", {
    httpOnly: true,
    path: "/refresh_token",
  });
};
