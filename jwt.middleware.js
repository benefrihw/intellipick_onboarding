import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

// accessToken 발급
export const accessToken = (user) => {
  const payload = {
    username: user.username,
    nickname: user.nickname,
    authorities: [{ authorityName: "ROLE_USER" }],
  };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, { expiresIn: "5m" });
};

// refreshToken 발급
export const refreshToken = (user) => {
  const payload = {
    username: user.username,
    nickname: user.nickname,
  };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1d" });
};
