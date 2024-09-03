import express from "express";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

// 임시 user 등록
const users = [
  {
    username: "JIN HO",
    password: "12341234",
    nickname: "Mentos",
  },
];

// accessToken 발급
const accessToken = (user) => {
  const payload = {
    username: user.username,
    nickname: user.nickname,
    authorities: [{ authorityName: "ROLE_USER" }],
  };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, { expiresIn: "5m" });
};

// refreshToken 발급
const refreshToken = (user) => {
  const payload = {
    username: user.username,
    nickname: user.nickname,
  };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1d" });
};

// 통신 확인
app.get("/", (req, res) => {
  res.json("Hello");
});

// 회원가입
app.post("/signup", (req, res) => {
  const { username, password, nickname } = req.body;

  const user = { username, password, nickname };
  users.push(user);

  return res.json({
    username,
    nickname,
    authorities: [{ authorityName: "ROLE_USER " }],
  });
});

// 로그인
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.json({ message: "존재하지 않는 유저입니다." });
  }

  const userAccessToken = accessToken(user);
  const userRefreshToken = refreshToken(user);

  return res.json({ userAccessToken, userRefreshToken });
});

app.listen(PORT, () => {
  console.log(`${PORT}번 포트로 연결되었습니다.`);
});
