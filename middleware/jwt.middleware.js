import jwt from "jsonwebtoken";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

// accessToken 발급
export const accessToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    authorities: user.authorities.map((auth) => auth.authorityName),
  };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, { expiresIn: "5m" });
};

// refreshToken 발급
export const refreshToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
  };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1d" });
};

// accessToken 검증
export const verifyAccessToken = (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ message: "토큰이 존재하지 않습니다." });
  }

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "권한이 없습니다." });
    }

    req.user = decoded;
    next();
  });
};
